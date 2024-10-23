import { PomodoroRecord } from "./PomodoroRecord.interface";

export interface TimerProps {
  mode: 'work' | 'shortBreak' | 'longBreak';
  setMode: (mode: 'work' | 'shortBreak' | 'longBreak') => void;
  soundNotification: boolean;
}

export interface TimerState {
  mode: 'work' | 'shortBreak' | 'longBreak';
  isActive: boolean;
  startTime: number | null;
  elapsedSeconds: number;
  completedCycles: number;
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  currentSession?: PomodoroRecord | null | undefined;
  sessions: PomodoroRecord[];
  loading: boolean;
  error: string | undefined | null;
}