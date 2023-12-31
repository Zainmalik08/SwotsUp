import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsersContent = createAsyncThunk(
  "users/fetchContent",
  async ({ page, pageSize }) => {
    try {
      const response = await axios.get(
        `http://13.53.73.237:5000/admin/users?page=${page}&pageSize=${pageSize}`
      );
      // console.log(response.data); // Move this line here
      return response.data;
    } catch (error) {
      console.error("Error fetching restaurant content:", error);
      throw error;
    }
  }
);

export const UsersSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    users: [],
  },
  reducers: {
    addNewUsers: (state, action) => {
      let { newUsersObj } = action.payload;
      state.users = [...state.users, newUsersObj];
    },

    deleteUsers: (state, action) => {
      let { index } = action.payload;
      state.users.splice(index, 1);
    },
  },

  extraReducers: {
    [getUsersContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsersContent.fulfilled]: (state, action) => {
      state.users = action.payload.data;
      state.totalUsers = action.payload.total;
      state.isLoading = false;
    },
    [getUsersContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewUsers, deleteUsers } = UsersSlice.actions;

export default UsersSlice.reducer;
