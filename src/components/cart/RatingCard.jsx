import React from 'react';

const StarRating = () => {
  const stars = [
    'https://cdn.builder.io/api/v1/image/assets/TEMP/65e91b589f4d903b34c8de96bb98307dd41989fdad9b8a952bb1ac8adc0e2a73?apiKey=732712bbeae44db9a2c6dcb6cbe06085&',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/b95b2291d8ec5aa6fe208ff0a7fd095b7676f70b8e0d5cd0472ca3b865bbda02?apiKey=732712bbeae44db9a2c6dcb6cbe06085&',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/a4e4761e953c0240b6d7157df4687441d941f11ef82e075d1b278ec35cb1ee20?apiKey=732712bbeae44db9a2c6dcb6cbe06085&',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/5d4d345d574242d3a4be822bf55bfecfa90049b3689000b8f1c5bd02f06736cd?apiKey=732712bbeae44db9a2c6dcb6cbe06085&',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/355a0079e1e2078a20ec876637837eb50fc814fbb134e9a40800d367aba0b2a6?apiKey=732712bbeae44db9a2c6dcb6cbe06085&'
  ];

  return (
    <div className="flex gap-1.5 mt-4">
      {stars.map((star, index) => (
        <img key={index} loading="lazy" src={star} alt="" className="shrink-0 aspect-square w-[18px]" />
      ))}
    </div>
  );
};

const UserAvatar = () => {
  return (
    <div className="flex flex-col">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/458f5f7c8737cfad8d84975e62508b472fb759a371a7f48cccbc00dc215c051f?apiKey=732712bbeae44db9a2c6dcb6cbe06085&" alt="User avatar" className="rounded-full aspect-square w-[67px]" />
      <StarRating />
    </div>
  );
};

const VoteButton = ({ src, count }) => {
  return (
    <div className="flex flex-col flex-1 justify-center">
      <img loading="lazy" src={src} alt="" className="self-center aspect-square w-[31px]" />
      <div className="border border-solid border-black border-opacity-10">
        {count}
      </div>
    </div>
  );
};

const VoteButtons = () => {
  return (
    <div className="flex gap-5 mt-1.5 text-base text-center whitespace-nowrap text-stone-400">
      <VoteButton src="https://cdn.builder.io/api/v1/image/assets/TEMP/baf6196543aa9ace0a62dcf4b52ede078f340f329198981b979b345863f5731d?apiKey=732712bbeae44db9a2c6dcb6cbe06085&" count={1} />
      <VoteButton src="https://cdn.builder.io/api/v1/image/assets/TEMP/d14e5966e91847f0be3de790b1bb1dc4f49efb92212c613bcf3327417556f138?apiKey=732712bbeae44db9a2c6dcb6cbe06085&" count={0} />
    </div>
  );
};

const RatingCard = () => {
  return (
    <article className="flex flex-col items-start py-6 pr-20 pl-10 bg-white rounded-md border border-solid border-black border-opacity-10 max-w-[832px] max-md:px-5">
      <header className="flex gap-4 w-full">
        <UserAvatar />
        <time className="self-end mt-20 text-base text-stone-400 max-md:mt-10">
          July 3, 2024
        </time>
      </header>
      <p className="mt-6 text-base leading-6 text-black max-md:max-w-full">
        You guys deserve 4 stars. Everytime my mom asks me to get pizza I order from the Papa app and use your reward coupon codes and etc, super reasonable prices, fresh hot pizza every time . Consistent quality, dedicated staff . Thumbs up for the past 5+ years , about time I drop a review for you guys..
      </p>
      <VoteButtons />
    </article>
  );
};

export default RatingCard;