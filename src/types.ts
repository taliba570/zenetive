export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | null;

export interface Task {
  _id: string;
  name: string;
  duration: number;
  isCompleted: boolean;
  priority?: TaskPriority;
  labels?: Label[];
}

export interface CreateTaskDto {
  name: string;
  duration: number;
  isCompleted: boolean;
  priority?: TaskPriority;
  labels?: Label[];
}

export interface Label {
  _id: string;
  name?: string;
  color?: string;
  userId?: string;
  createdAt?: string;
}

export interface CreateLabelDto {
  name: string;
  color: string;
}