// src/redux/slices/users.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

// Асинхронный экшен для получения списка пользователей
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { data } = await axios.get("/users");
  return data;
});

const initialState = {
  users: [],
  usersStatus: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.usersStatus = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.usersStatus = "succeeded";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.usersStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllUsers = (state) => state.users.users;
export const selectUsersStatus = (state) => state.users.usersStatus;

export const usersReducer = usersSlice.reducer;
