import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../services/apis/Api";
import { FetchTasksResponse, Task } from "../../../components/tasks/interface/Task.interface";

// Async thunk to add a task
export const addTask = createAsyncThunk<Task, Task>(
  'tasks/addTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await Api.post('/tasks', taskData);
      return response.data as Task; // Explicitly cast the response to the expected type
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch tasks (with pagination)
export const fetchTasks = createAsyncThunk<FetchTasksResponse, { page: number; limit: number }>(
  'tasks/fetchTasks',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/tasks?page=${page}&limit=${limit}`);
      return response.data as FetchTasksResponse; // Ensure the response is cast to the expected type
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string, { rejectWithValue }) => {
    try {
      await Api.delete(`/tasks/${taskId}`);
      return taskId;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (taskData: Task, { rejectWithValue }) => {
    try {
      const response = await Api.put<Task>(`/tasks/${taskData._id}`, taskData);
      return response.data as Task;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const toggleTaskComplete = createAsyncThunk(
  'tasks/toggleTaskComplete',
  async (task: Task, { rejectWithValue }) => {
    try {
      const updatedTask = { ...task, isCompleted: !task.isCompleted };
      const response = await Api.put<Task>(`/tasks/${task._id}`, updatedTask);
      return response.data as Task;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchTaskById',
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/tasks/${taskId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchTasks = createAsyncThunk(
  'tasks/searchTasks',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/tasks/search?q=${query}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);