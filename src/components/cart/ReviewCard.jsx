import React from 'react';
import { FaStar } from "react-icons/fa";
const ReviewCard = () => {
    return (
        <div className='w-full h-full justify-center flex items-center'>
            <div class=" w-[260px] overflow-hidden border-gray-200  border rounded-[10px]  ">
                <div class=" ml-4 w-[50px] h-[50px] object-cover rounded-full overflow-hidden mt-5">
                    <img src=".//src/assets/image/profile.png" alt="profile" /></div>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-[18px] font-semibold tracking-tight -mt-2 text-gray-900 dark:text-white">User Name</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">july 6 ,2024</p>
                    <div class="flex gap-2 mb-3" style={{ color: '#F6B721' }}  >
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </div>
                    <div class=" ">Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint.</div>
                </div>

            </div>
        </div>
    );
};



export default ReviewCard;
