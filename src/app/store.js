import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";

import restaurantsSlice from "../features/Restaurants/RestaurantsSlice";
import UsersSlice from "../features/users/UsersSlice";
import ReviewsSlice from "../features/reviews/ReviewsSlice";

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  restaurant: restaurantsSlice,
  user: UsersSlice,
  review: ReviewsSlice,
};

export default configureStore({
  reducer: combinedReducer,
});
