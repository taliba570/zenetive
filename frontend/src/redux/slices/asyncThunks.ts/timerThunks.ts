import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../services/apis/Api";

export const fetchPomodoroSettings = createAsyncThunk(
  'timer/fetchPomodoroSettings',
  async () => {
    const response = await Api.get('/pomodoro-settings');
    return response;
  }
);

export const updateWorkDuration = createAsyncThunk(
  'timer/updateWorkDuration',
  async (workDuration: number) => {
    const response = await Api.patch('/pomodoro-settings/work-duration', { workDuration });
    return response.data;
  }
);

export const updateShortBreakDuration = createAsyncThunk(
  'timer/updateShortBreakDuration',
  async (shortBreakDuration: number) => {
    const response = await Api.patch('/pomodoro-settings/short-break-duration', { shortBreakDuration });
    return response.data;
  }
);

export const updateLongBreakDuration = createAsyncThunk(
  'timer/updateLongBreakDuration',
  async (longBreakDuration: number) => {
    const response = await Api.patch('/pomodoro-settings/long-break-duration', { longBreakDuration });
    return response.data;
  }
);