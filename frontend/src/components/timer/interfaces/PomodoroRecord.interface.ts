import { Task } from "../../tasks/interface/Task.interface";

export interface SearchableDropdownProps {
  value: string | null;
  onChange: (taskId: Task | null) => void;
}

export enum PomorodoState {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  PAUSED = 'PAUSED',
  CANCELLED = 'CANCELLED',
  DELETED = 'DELETED',
  SKIPPED = 'SKIPPED',
}

export interface PomodoroRecord {
  userId: string;
  taskId: string;
  _id?: string;
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

export interface UpdatePomodoroRecordDto {
  spentDuration: number;
  actualEndTime?: number;
  state: PomorodoState.COMPLETED
}

// Define the input for the asyncThunk
export interface UpdatePomodoroRecordParams {
  id: string;
  updatePomodoroRecordDto: UpdatePomodoroRecordDto;
}