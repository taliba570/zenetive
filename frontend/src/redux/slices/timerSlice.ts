import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { timeToSeconds } from "../../utils/formatTime";
import { 
  fetchPomodoroSettings, 
  updateLongBreakDuration, 
  updateShortBreakDuration, 
  updateWorkDuration 
} from "./asyncThunks/timerThunks";
import { TimerState } from "../../components/timer/interfaces/Timer.interface";

const initialState: TimerState = {
  mode: 'work',
  isActive: false,
  startTime: null,
  elapsedSeconds: 0,
  completedCycles: parseInt(localStorage.getItem('completedCycles') || '0', 10),
  workDuration: 1500,
  shortBreakDuration: 300,
  longBreakDuration: 900,
  currentSession: null,
  sessions: [],
  loading: false,
  error: undefined,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setInitialValues(state, action: PayloadAction<any>) {
      state.workDuration = action.payload.workTime;
      state.shortBreakDuration = action.payload.shortBreakTime;
      state.longBreakDuration = action.payload.longBreakTime;
    },
    startTimer(state, action: PayloadAction<number>) {
      state.isActive = true;
      state.startTime = Date.now();
    },
    pauseTimer(state) {
      state.isActive = false;
      state.elapsedSeconds = Math.floor((Date.now() - (state.startTime ? new Date(state.startTime).getTime() : Date.now())) / 1000);
      state.startTime = null;
    },
    resetTimer(state) {
      state.isActive = false;
      state.elapsedSeconds = 0;
      state.startTime = null;
    },
    switchMode(state, action: PayloadAction<'work' | 'shortBreak' | 'longBreak'>) {
      state.mode = action.payload;
      state.isActive = false;
      state.elapsedSeconds = 0;
      state.startTime = null;
    },
    tick(state) {
      if (state.isActive && state.startTime) {
        const now = Date.now();
        state.elapsedSeconds = Math.floor((now - new Date(state.startTime).getTime()) / 1000);
      }
    },
    incrementCompletedCycles(state) {
      state.completedCycles += 1;
      localStorage.setItem('completedCycles', JSON.stringify(state.completedCycles));
    },
    resetCompeltedCycles(state) {
      state.completedCycles = 0;
      localStorage.setItem('completedCycles', '0');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPomodoroSettings.fulfilled, (state, action: any) => {
        const { workDuration, shortBreakDuration, longBreakDuration } = action.payload.data;
        state.workDuration = workDuration;
        state.shortBreakDuration = shortBreakDuration;
        state.longBreakDuration = longBreakDuration;

        localStorage.setItem('pomodoroSettings', JSON.stringify({
          workTime: workDuration,
          shortBreakTime: shortBreakDuration,
          longBreakTime: longBreakDuration
        }));
      })
      .addCase(updateWorkDuration.fulfilled, (state, action) => {
        state.workDuration = action.payload.workDuration;

        // Retrieve existing pomodoroSettings from localStorage
        const pomodoroSettings = JSON.parse(localStorage.getItem('pomodoroSettings') || '{}');
      
        // Update the workTime value
        pomodoroSettings.workTime = action.payload.workDuration;
      
        // Save updated pomodoroSettings back to localStorage
        localStorage.setItem('pomodoroSettings', JSON.stringify(pomodoroSettings));
      })
      .addCase(updateShortBreakDuration.fulfilled, (state, action) => {
        state.shortBreakDuration = action.payload.shortBreakDuration;

        // Retrieve existing pomodoroSettings from localStorage
        const pomodoroSettings = JSON.parse(localStorage.getItem('pomodoroSettings') || '{}');
      
        // Update the shortBreakTime value
        pomodoroSettings.shortBreakTime = action.payload.shortBreakDuration;
      
        // Save updated pomodoroSettings back to localStorage
        localStorage.setItem('pomodoroSettings', JSON.stringify(pomodoroSettings));
      })
      .addCase(updateLongBreakDuration.fulfilled, (state, action) => {
        state.longBreakDuration = action.payload.longBreakDuration;

        // Retrieve existing pomodoroSettings from localStorage
        const pomodoroSettings = JSON.parse(localStorage.getItem('pomodoroSettings') || '{}');
      
        // Update the longBreakTime value
        pomodoroSettings.longBreakTime = action.payload.longBreakDuration;
      
        // Save updated pomodoroSettings back to localStorage
        localStorage.setItem('pomodoroSettings', JSON.stringify(pomodoroSettings));
      });
  },
});

export const {
  startTimer,
  pauseTimer,
  resetTimer,
  switchMode,
  tick,
  incrementCompletedCycles,
  resetCompeltedCycles,
  setInitialValues,
} = timerSlice.actions;

export default timerSlice.reducer;