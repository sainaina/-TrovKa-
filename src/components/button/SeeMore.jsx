"use client";

import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";

export function SeeMore() {
  return (
    <div className="flex justify-end flex-wrap gap-2 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mr-[95px] mt-[40px]">
      <Button className="bg-secondary flex rounded-xl items-center dark:bg-primary text-base md:text-lg lg:text-xl px-4 py-2 hover:bg-primary hover:text-secondary-dark focus:ring-4 focus:ring-secondary transition duration-300">
        See More
        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}
