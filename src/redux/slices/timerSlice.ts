import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { timeToSeconds } from "../../utils/formatTime";
import { 
  fetchPomodoroSettings, 
  updateLongBreakDuration, 
  updateShortBreakDuration, 
  updateWorkDuration 
} from "./asyncThunks.ts/timerThunks";
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
    startTimer(state, action: PayloadAction<number>) {
      state.isActive = true;
      state.startTime = Date.now();
      console.log(state.startTime);
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
        const { workDuration, shortBreakDuration, longBreakDuration } = action.payload;
        state.workDuration = timeToSeconds(workDuration);
        state.shortBreakDuration = timeToSeconds(shortBreakDuration);
        state.longBreakDuration = timeToSeconds(longBreakDuration);

        localStorage.setItem('pomodoroSettings', JSON.stringify(action.payload));
      })
      .addCase(updateWorkDuration.fulfilled, (state, action) => {
        state.workDuration = action.payload.workDuration;
        localStorage.setItem('workDuration', action.payload.workDuration);
      })
      .addCase(updateShortBreakDuration.fulfilled, (state, action) => {
        state.shortBreakDuration = action.payload.shortBreakDuration;
        localStorage.setItem('shortBreakDuration', action.payload.shortBreakDuration);
      })
      .addCase(updateLongBreakDuration.fulfilled, (state, action) => {
        state.longBreakDuration = action.payload.longBreakDuration;
        localStorage.setItem('longBreakDuration', action.payload.longBreakDuration);
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
} = timerSlice.actions;

export default timerSlice.reducer;