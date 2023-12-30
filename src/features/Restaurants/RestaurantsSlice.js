import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRestaurantsContent = createAsyncThunk(
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

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: {
    isLoading: false,
    restaurants: [],
  },
  reducers: {
    addNewRestaurants: (state, action) => {
      let { newRestaurantsObj } = action.payload;
      state.restaurants = [...state.restaurants, newRestaurantsObj];
    },

    deleteRestaurants: (state, action) => {
      let { index } = action.payload;
      state.restaurants.splice(index, 1);
    },
  },

  extraReducers: {
    [getRestaurantsContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getRestaurantsContent.fulfilled]: (state, action) => {
      state.restaurants = action.payload.data;
      state.isLoading = false;
    },
    [getRestaurantsContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewRestaurants, deleteRestaurants } =
  restaurantsSlice.actions;

export default restaurantsSlice.reducer;
