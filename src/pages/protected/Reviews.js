import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

import Restaurants from "../../features/Restaurants";
import Reviews from "../../features/reviews";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Restaurants" }));
  }, []);

  return <Reviews />;
}

export default InternalPage;
