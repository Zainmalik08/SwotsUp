import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsersContent = createAsyncThunk(
  "restaurants/fetchContent", // Updated action type
  async () => {
    try {
      const response = await axios.get(
        "http://13.53.73.237:5000/admin/restaurants?page=2&pageSize=5",
        {}
      );
      return response.data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching restaurant content:", error);
      throw error; // Rethrow the error to be caught by the Redux state
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
      state.isLoading = false;
    },
    [getUsersContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewUsers, deleteUsers } = UsersSlice.actions;

export default UsersSlice.reducer;
