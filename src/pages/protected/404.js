import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import AppLogo from "../../assets/images/SwotsUpLogo.png";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, [dispatch]);

  return (
    <div className="hero h-4/5 bg-base-200">
      <div className="hero-content text-accent text-center">
        <div className="max-w-md">
          <img src={AppLogo} alt="App-logo" />
        </div>
      </div>
    </div>
  );
}

export default InternalPage;
