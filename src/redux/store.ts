import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "./slices/timerSlice";
import taskReducer from "./slices/taskSlice";
import labelReducer from "./slices/labelSlice";
import pomodoroRecordReducer from "./slices/pomodoroRecordSlice";

const config = {
  reducer: {
    timer: timerReducer,
    tasks: taskReducer,
    labels: labelReducer,
    pomodoroRecord: pomodoroRecordReducer
  },
};

const store = configureStore(config);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;