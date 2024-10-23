import { Task } from "../../tasks/interface/Task.interface";

export interface SearchableDropdownProps {
  value: string | null;
  onChange: (taskId: Task | null) => void;
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
  duration: number;
  endTime?: number;
  wasCompleted: boolean;
}

// Define the input for the asyncThunk
export interface UpdatePomodoroRecordParams {
  id: string;
  updatePomodoroRecordDto: UpdatePomodoroRecordDto;
}