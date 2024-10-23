import { Task } from "../../tasks/interface/Task.interface";

export interface SearchableDropdownProps {
  value: string | null;
  onChange: (taskId: Task | null) => void;
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

export interface PomodoroRecord {
  userId: string;
  taskId: string;
  pomodoroId?: string;
  duration: number;
  startTime: number;
  endTime: number;
  isRunning: boolean;
  wasCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PomodoroRecordState {
  pomodoroRecords: PomodoroRecord[];
  currentPomodoroRecord: PomodoroRecord | null;
  loading: boolean;
  error: string | null;
}