import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../services/apis/Api";
import { UpdatePomodoroRecordParams } from "../../../components/timer/interfaces/PomodoroRecord.interface";

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

export const updatePomodoroRecord = createAsyncThunk<
any, // Response type
UpdatePomodoroRecordParams, // Arguments type (what you pass to the thunk)
{ rejectValue: string } // Error type if rejected
>(
  'pomodoro/updateRecord',
  async ({ id, updatePomodoroRecordDto }, { rejectWithValue }) => {
    try {
      // Make the PATCH request to the backend API
      const response = await Api.patch(`/pomodoro-records/${id}`, updatePomodoroRecordDto);

      return response.data;
    } catch (error: any) {
      // Handle errors and reject with value for error handling in your Redux slice
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);