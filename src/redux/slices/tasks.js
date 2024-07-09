// src/redux/slices/tasks.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const { data } = await axios.get("/tasks");
  return data;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllTasks = (state) => state.tasks.tasks;
export const selectTasksStatus = (state) => state.tasks.status;

export const tasksReducer = tasksSlice.reducer;
