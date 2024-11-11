import { 
  createSlice, 
  PayloadAction
} from '@reduxjs/toolkit';
import { FetchLabelsResponse, Label, LabelState } from '../../components/labels/interfaces/label.interface';
import { addLabel, fetchLabels } from './asyncThunks.ts/labelThunks';

export const initialState: LabelState = {
  labels: [],
  loading: false,
  error: null,
};

const labelSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    // Define synchronous reducers if needed
  },
  extraReducers: (builder) => {
    // Handle addLabel
    builder
      .addCase(addLabel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLabel.fulfilled, (state, action: PayloadAction<Label>) => {
        state.loading = false;
        state.labels.unshift(action.payload);
      })
      .addCase(addLabel.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to add label';
      });

    // Handle fetchLabels
    builder
      .addCase(fetchLabels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLabels.fulfilled, (state, action: PayloadAction<FetchLabelsResponse>) => {
        state.loading = false;
        state.labels = [...state.labels, ...action.payload.labels];
      })
      .addCase(fetchLabels.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch labels';
      });
  },
});

export default labelSlice.reducer;
