

import { Rating } from "flowbite-react";

export function RatingComponent() {
    return (
        <>
            <Rating className="mb-2">
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star filled={false} />
                <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">4 out of 5</p>
            </Rating>
            <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">1,745 global ratings</p>
            <Rating.Advanced percentFilled={70} className="mb-5 ">
                5 star
            </Rating.Advanced>
            <Rating.Advanced percentFilled={17} className="mb-5">
                4 star
            </Rating.Advanced>
            <Rating.Advanced percentFilled={8} className="mb-5">
                3 star
            </Rating.Advanced>
            <Rating.Advanced percentFilled={4} className="mb-5">
                2 star
            </Rating.Advanced>
            <Rating.Advanced percentFilled={1}>1 star</Rating.Advanced>

        </>
    );
}
