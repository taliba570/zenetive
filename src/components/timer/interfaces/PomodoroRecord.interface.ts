import { Task } from "../../tasks/interface/Task.interface";

export interface SearchableDropdownProps {
  value: string | null;
  onChange: (taskId: Task | null) => void;
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