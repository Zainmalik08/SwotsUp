import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

import Restaurants from "../../features/Restaurants";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Restaurants" }));
  }, []);

  return <Restaurants />;
}

export default InternalPage;
