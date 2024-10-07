import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Api from "../services/apis/Api";
import { timeToSeconds } from "../utils/formatTime";

interface TimerState {
  mode: 'work' | 'shortBreak' | 'longBreak';
  isActive: boolean;
  startTime: number | null;
  elapsedSeconds: number;
  completedCycles: number;
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
}

const initialState: TimerState = {
  mode: 'work',
  isActive: false,
  startTime: null,
  elapsedSeconds: 0,
  completedCycles: parseInt(localStorage.getItem('completedCycles') || '0', 10),
  workDuration: 1500,
  shortBreakDuration: 300,
  longBreakDuration: 900
};

export const fetchPomodoroSettings = createAsyncThunk(
  'timer/fetchPomodoroSettings',
  async () => {
    const response = await Api.get('/pomodoro-settings');
    return response;
  }
);

export const updateWorkDuration = createAsyncThunk(
  'timer/updateWorkDuration',
  async (workDuration: number) => {
    const response = await Api.patch('/pomodoro-settings/work-duration', { workDuration });
    return response.data;
  }
);

export const updateShortBreakDuration = createAsyncThunk(
  'timer/updateShortBreakDuration',
  async (shortBreakDuration: number) => {
    const response = await Api.patch('/pomodoro-settings/short-break-duration', { shortBreakDuration });
    return response.data;
  }
);

export const updateLongBreakDuration = createAsyncThunk(
  'timer/updateLongBreakDuration',
  async (longBreakDuration: number) => {
    const response = await Api.patch('/pomodoro-settings/long-break-duration', { longBreakDuration });
    return response.data;
  }
);

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer(state, action: PayloadAction<number>) {
      state.isActive = true;
      state.startTime = Date.now() - state.elapsedSeconds * 1000;
    },
    pauseTimer(state) {
      state.isActive = false;
      state.elapsedSeconds = Math.floor((Date.now() - (state.startTime || Date.now())) / 1000);
      state.startTime = null;
    },
    resetTimer(state, action: PayloadAction<number>) {
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
        state.elapsedSeconds = Math.floor((now - state.startTime) / 1000);
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