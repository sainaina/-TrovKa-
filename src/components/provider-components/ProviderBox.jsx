import React, { useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../../lib/secureLocalStorage";
import { fetchProfile } from "../../redux/feature/user/userSlice";


export const ProviderBox = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      dispatch(fetchProfile(accessToken));
    }
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[350px] h-[400px] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <img
            src={user.avatar}
            alt=""
            className="w-[150px] h-[150px] rounded-full"
          />
          <p className="mt-2 font-semibold text-Primary text-[22px] text-center">
            {user.username}
          </p>
          <span className="text-center">We provide best Electronic services</span>
          <div className="w-28 h-5 flex justify-between text-Secondary mt-2">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
          </div>
          <div className="flex justify-between items-center w-full mt-4 px-14">
            <div className="text-center">
              <p className="font-bold">22</p>
              <span>Services</span>
            </div>
            <div className="text-center">
              <p className="font-bold">22</p>
              <span>Review</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
