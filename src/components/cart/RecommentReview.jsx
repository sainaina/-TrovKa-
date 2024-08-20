import React from 'react';

const StarRating = ({ stars, percentage }) => (
  <div className="flex gap-5 mt-6 max-md:flex-wrap max-md:max-w-full">
    <div className="grow text-base text-stone-400">{stars} stars</div>
    <div className="flex flex-col grow shrink-0 justify-center items-start self-start rounded-xl basis-0 bg-zinc-300 w-fit">
      <div
        className="shrink-0 bg-blue-500 rounded-xl h-[13px]"
        style={{ width: `${percentage}px` }}
      />
    </div>
  </div>
);

const ratingData = [
  { stars: 5, percentage: 405 },
  { stars: 4, percentage: 178 },
  { stars: 3, percentage: 42 },
  { stars: 2, percentage: 73 },
  { stars: 1, percentage: 120 },
];

function OverallRating() {
  return (
    <div className="mx-[92px]  py-6 px-5 bg-white rounded-md border border-solid border-black border-opacity-10 max-w-[832px] max-md:px-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[31%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col text-xl font-bold text-black max-md:mt-10">
            <div>Recommented Review</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5611fea64a6792368f8d46da51096d10baa9bcf133c6bc17fbab19b9b8bac75a?apiKey=9deb1edcb31d45a78fce95c6c11be899&"
              className="mt-24 max-w-full aspect-[1.69] w-[147px] max-md:mt-10"
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[69%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow mt-20 max-md:mt-10 max-md:max-w-full">
            {ratingData.map((rating, index) => (
              <StarRating
                key={index}
                stars={rating.stars}
                percentage={rating.percentage}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverallRating;
