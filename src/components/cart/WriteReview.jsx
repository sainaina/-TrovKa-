import React, { useState } from 'react';

const UserAvatar = ({ username, avatarSrc }) => (
  <div className="flex gap-5 text-xl whitespace-nowrap">
    <img
      loading="lazy"
      src={avatarSrc}
      alt={`${username}'s avatar`}
      className="shrink-0 rounded-full aspect-square w-[67px]"
    />
    <div className="my-auto">{username}</div>
  </div>
);

const StarRating = () => (
  <img
    loading="lazy"
    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2734dd6ce043b9de7303956c51388d3e47660b8059f42c74381a538e0cf2520d?apiKey=9deb1edcb31d45a78fce95c6c11be899&"
    alt="Star rating"
    className="mt-5 max-w-full aspect-[5.88] w-[157px]"
  />
);

const CommentInput = ({ id, value, onChange }) => (
  <textarea
    id={id}
    value={value}
    onChange={onChange}
    className="justify-center p-3 mt-2.5 text-sm rounded-lg border border-gray-300 border-solid bg-white bg-opacity-0 text-slate-400 max-md:pr-5 w-full"
    placeholder="Your Comment"
    aria-label="Your review comment"
  ></textarea>
);

const SubmitButton = ({ onClick }) => (
  <button
    type="submit"
    onClick={onClick}
    className="ml-[590px] justify-center self-center px-3.5 py-2 mt-5 text-xs leading-5 text-white uppercase bg-blue-900 rounded-lg shadow-md"
  >
    post comment
  </button>
);

const WriteReview = () => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted comment:', comment);
    setComment('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-[92px] mt-10 flex flex-col items-start py-8 pr-20 pl-9 text-black bg-white rounded-md border border-solid border-black border-opacity-10 max-w-[832px] max-md:px-5"
    >
      <UserAvatar username="Adminh" avatarSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/c5408da1037af050c4bdb92d60bb7ea0c0a139046ee4be70f6cc5a2772020137?apiKey=9deb1edcb31d45a78fce95c6c11be899&" />
      <StarRating />
      <label htmlFor="reviewInput" className="mt-3 text-base">
        Start your review of Pu Chhveng
      </label>
      <CommentInput
        id="reviewInput"
        value={comment}
        onChange={handleCommentChange}
      />
      <SubmitButton onClick={handleSubmit} />
    </form>
  );
};

export default WriteReview;