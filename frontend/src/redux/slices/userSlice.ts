import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../../components/user/interfaces/user.interface";
import { signupGithubUser, signupGoogleUser } from "./asyncThunks/userThunk";

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupGithubUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupGoogleUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
  },
});

export default userSlice.reducer;