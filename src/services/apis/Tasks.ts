import { CreateTaskDto, Task } from "../../utils/types";
import Api from "./Api";

export const fetchTasks = async (page: number, limit: number) => {
  try {
    const response = await Api.get(`/tasks?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Erorr fetching tasks:', error);
    throw error;
  }
}

export const createTask = async (taskData: CreateTaskDto): Promise<Task> => {
  try {
    const response = await Api.post<Task>('/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

export const updateTask = async (taskId: string, taskData: Omit<Task, 'id'>): Promise<Task> => {
  try {
    const response = await Api.put<Task>(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

export const editTask = async (taskId: string, taskData: Partial<Task>): Promise<Task> => {
  try {
    const response = await Api.patch<Task>(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.log('Error editing task:', error);
    throw error;
  }
}

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await Api.delete(`/tasks/${taskId}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}