import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { usersReducer } from "./slices/users";
import { tasksReducer } from "./slices/tasks";

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        tasks: tasksReducer,
    }
});

export default store;