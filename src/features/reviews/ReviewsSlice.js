import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getReviewsContent = createAsyncThunk(
  "Reviews/fetchContent", // Updated action type
  async ({ page, pageSize }) => {
    try {
      const response = await axios.get(
        `http://13.53.73.237:5000/admin/reviews?page=${page}&pageSize=${pageSize}`,

        {}
      );
      return response.data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching restaurant content:", error);
      throw error; // Rethrow the error to be caught by the Redux state
    }
  }
);

export const ReviewsSlice = createSlice({
  name: "Reviews",
  initialState: {
    isLoading: false,
    reviews: [],
  },
  reducers: {
    addNewReview: (state, action) => {
      let { newReviewsObj } = action.payload;
      state.reviews = [...state.reviews, newReviewsObj];
    },

    deleteReview: (state, action) => {
      let { index } = action.payload;
      state.reviews.splice(index, 1);
    },
  },

  extraReducers: {
    [getReviewsContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getReviewsContent.fulfilled]: (state, action) => {
      state.reviews = action.payload.data;
      state.totalReviews = action.payload.total;

      state.isLoading = false;
    },
    [getReviewsContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewReview, deleteReview } = ReviewsSlice.actions;

export default ReviewsSlice.reducer;
