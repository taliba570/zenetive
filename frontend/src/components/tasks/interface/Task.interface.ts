import { TaskPriority } from "../../../utils/types";
import { Label } from "../../labels/interfaces/label.interface";
import { PomodoroRecord } from "../../timer/interfaces/PomodoroRecord.interface";

export interface Task {
  _id?: string;
  name: string;
  duration?: number;
  isCompleted: boolean;
  priority?: TaskPriority;
  estimatedPomodoroSessions?: number;
  linkToPomodoro?: boolean;
  linkedPomodoroSessions?: PomodoroRecord[];
  labels?: Label[];
  dueDate: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface FetchTasksResponse {
  tasks: Task[];
  totalTasks: number;
  totalPages: number;
  currentPage: number;
}

export interface TaskInputProps {
  taskInput: string;
  setTaskInput: (input: string) => void;
  addTask: () => void;
  priority: TaskPriority;
  setPriority: (priority: TaskPriority) => void;
  labels: Label[];
  setLabels: (labels: Label[]) => void;
  creatingTask: boolean;
  setCreatingTask: (arg: boolean) => void;
  selectedLabels: Label | null,
  setSelectedLabels: (arg: Label) => void;
}

export interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null; // Optional task prop for edit mode
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  currentTask: Task | null,
  error: string | null;
  fetched: boolean,
  searchResults: [], 
  searchLoading: boolean,
  searchError: string | null,
}

export interface CreateTaskDto {
  name: string;
  duration: number;
  isCompleted: boolean;
  priority?: TaskPriority;
  labels?: Label[];
}

export interface TaskListContainerProps {
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleComplete: (task: Task) => void; 
}

export interface TaskItemProps extends TaskListContainerProps {
  task: Task;
}

export interface AddTaskModalFormProps {
  taskName: string;
  setTaskName: (taskName: string) => void;
  priority: TaskPriority | undefined;
  setPriority: (priority: TaskPriority) => void;
  dueDate: string | null;
  setDueDate: (dueDate: string) => void;
  estimatedPomodoroSessions: number | undefined;
  setEstimatedPomodoroSessions: (estimatedPomodoroSessions: number) => void;
  linkToPomodoro: boolean;
  setLinkToPomodoro: (linkToPomodoro: boolean) => void;
  selectedLabels: any;
  setSelectedLabels: (selectedLabels: any) => void;
  task?: Task | null;
}