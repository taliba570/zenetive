import { 
  createSlice, 
  PayloadAction
} from '@reduxjs/toolkit';
import { 
  FetchTasksResponse, 
  Task, 
  TaskState 
} from '../../components/tasks/interface/Task.interface';
import { 
  addTask, 
  deleteTask, 
  fetchTaskById, 
  fetchTasks, 
  searchTasks, 
  toggleTaskComplete, 
  updateTask 
} from './asyncThunks.ts/taskThunks';

const initialState: TaskState = {
  tasks: [],
  currentTask: null,
  loading: false,
  error: null,
  fetched: false,
  searchResults: [],
  searchLoading: false,
  searchError: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentTask: (state, action: PayloadAction<Task | null>) => {
      state.currentTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle addTask
    builder
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(addTask.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to add task';
      });

    // Handle fetchTasks
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<FetchTasksResponse>) => {
        state.loading = false;
        state.tasks = [...state.tasks, ...action.payload.tasks];
      })
      .addCase(fetchTasks.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch tasks';
      });

    // Handle deleteTask
    builder
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        // Filter out the deleted task from the tasks array
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete task';
      });

      // Handle updateTask
      builder
        .addCase(updateTask.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
          state.loading = false;
          const index = state.tasks.findIndex((task) => task._id === action.payload._id);
          if (index !== -1) {
            state.tasks[index] = action.payload;
          }
        })
        .addCase(updateTask.rejected, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload?.message || 'Failed to update task';
        });

      // Handle toggleTaskComplete
      builder
        .addCase(toggleTaskComplete.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(toggleTaskComplete.fulfilled, (state, action: PayloadAction<Task>) => {
          state.loading = false;
          const index = state.tasks.findIndex((task) => task._id === action.payload._id);
          if (index !== -1) {
            state.tasks[index] = action.payload;
          }
        })
        .addCase(toggleTaskComplete.rejected, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload?.message || 'Failed to toggle task completion';
        });

        // Handle fetchTaskById
        builder
          .addCase(fetchTaskById.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchTaskById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentTask = action.payload;
          })
          .addCase(fetchTaskById.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.message || 'Failed to fetch task';
          });
        // Handle searchTasks
        builder
          .addCase(searchTasks.pending, (state) => {
            state.searchLoading = true;
            state.searchError = null;
          })
          .addCase(searchTasks.fulfilled, (state, action) => {
            state.searchLoading = false;
            state.searchResults = action.payload; // Array of tasks
          })
          .addCase(searchTasks.rejected, (state, action: any) => {
            state.searchLoading = false;
            state.searchError = action.payload?.message || 'Failed to search tasks';
          });
  },
});

export const { setCurrentTask } = taskSlice.actions;

export default taskSlice.reducer;
