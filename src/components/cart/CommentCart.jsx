import React from "react";
import { FaStar } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

export const CommentCart = () => {
  return (
    <div className="w-full max-w-3xl border rounded-lg p-6 mx-auto my-4">
      <div className="flex gap-3 items-center">
        <img
          className="w-16 h-16 rounded-full"
          src=".//src/assets/image/profile.png"
          alt="Profile"
        />
        <p className="font-semibold text-lg">Chiminh</p>
      </div>

      <div className="flex gap-1 items-center mt-2">
        <div className="flex gap-1 text-Secondary">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <div className="pl-2">
          <p className="text-gray-400 text-md">July 3, 2024</p>
        </div>
      </div>

      <div className="mt-3">
        <p className="font-normal text-base">
          You guys deserve 4 stars. Every time my mom asks me to get pizza I order
          from the Papa app and use your reward coupon codes and etc, super reasonable
          prices, fresh hot pizza every time. Consistent quality, dedicated staff.
          Thumbs up for the past 5+ years, about time I drop a review for you guys.
        </p>
      </div>

      <div className="flex mt-4">
        <div className="items-center gap-1 mr-4 text-Primary">
          <AiOutlineLike className="w-8 h-8 text-primary" />
          <p className="ml-1 mt-1 text-gray-400">29</p>
        </div>
        <div className="items-center gap-1  ">
          <AiOutlineDislike className="w-8 h-8 text-Primary " />
          <p className="ml-2 mt-1 text-gray-400">0</p>
        </div>
      </div>
    </div>
  );
};
