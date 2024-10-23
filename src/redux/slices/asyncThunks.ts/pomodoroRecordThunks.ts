import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../services/apis/Api";

export const createPomodoroSession = createAsyncThunk(
  'pomodoro/createSession',
  async (sessionData: any, { rejectWithValue }) => {
    try {
      const response = await Api.post('/pomodoro-records', sessionData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const completeSession = createAsyncThunk(
  'pomodoro/completeSession',
  async (pomodoroData: any, thunkAPI) => {
    const response = await Api.post('/pomodoro-records', pomodoroData);
    return response.data;
  }
);