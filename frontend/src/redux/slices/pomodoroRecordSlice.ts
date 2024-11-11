import { createSlice } from "@reduxjs/toolkit";
import { completeSession, createPomodoroSession } from "./asyncThunks.ts/pomodoroRecordThunks";
import { PomodoroRecordState } from "../../components/timer/interfaces/PomodoroRecord.interface";

const initialState: PomodoroRecordState = {
  pomodoroRecords: [],
  currentPomodoroRecord: null,
  loading: false,
  error: null,
};

const pomodoroRecordSlice = createSlice({
  name: 'pomodoroRecord',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPomodoroSession.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createPomodoroSession.fulfilled, (state, action) => {
      state.pomodoroRecords.push(action.payload);
      state.currentPomodoroRecord = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createPomodoroSession.rejected, (state) => {
      state.loading = false;  
    });
    builder
      .addCase(completeSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeSession.fulfilled, (state, action) => {
        state.loading = false;
        state.pomodoroRecords.push(action.payload);
        state.currentPomodoroRecord = null;
      })
      .addCase(completeSession.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export default pomodoroRecordSlice.reducer;