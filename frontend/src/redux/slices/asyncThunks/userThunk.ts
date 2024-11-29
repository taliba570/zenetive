import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../services/apis/Api";
import { User } from "../../../components/user/interfaces/user.interface";

export const signupGithubUser = createAsyncThunk(
    'auth/signupGithub',
    async (user: User) => {
      const response = await Api.patch('/auth/github/callback', { ...user });
      return response.data;
    }
  );

  export const signupGoogleUser = createAsyncThunk(
      'auth/signupGoogle',
      async (user: User) => {
        const response = await Api.patch('/auth/google/callback', { user });
        return response.data;
      }
    );