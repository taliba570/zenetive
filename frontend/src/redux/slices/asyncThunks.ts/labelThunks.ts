import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../services/apis/Api";
import { FetchLabelsResponse, Label } from "../../../components/labels/interfaces/label.interface";

// Async thunk to add a label
export const addLabel = createAsyncThunk<Label, Label>(
  'labels/addLabel',
  async (labelData, { rejectWithValue }) => {
    try {
      const response = await Api.post('/labels', labelData);
      return response.data as Label; // Explicitly cast the response to the expected type
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch labels (with pagination)
export const fetchLabels = createAsyncThunk<FetchLabelsResponse, { page: number; limit: number }>(
  'labels/fetchLabels',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/labels?page=${page}&limit=${limit}`);
      return {
        labels: response.data.labels, 
        totalLabels: response.data.totalLabels, 
        totalPages: response.data.totalPages, 
        currentPage: response.data.currentPage
      } as FetchLabelsResponse;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);