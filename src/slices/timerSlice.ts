import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimerState {
  mode: 'work' | 'shortBreak' | 'longBreak';
  isActive: boolean;
  startTime: number | null;
  elapsedSeconds: number;
  completedCycles: number;
}

const initialState: TimerState = {
  mode: 'work',
  isActive: false,
  startTime: null,
  elapsedSeconds: 0,
  completedCycles: parseInt(localStorage.getItem('completedCycles') || '0', 10),
};

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