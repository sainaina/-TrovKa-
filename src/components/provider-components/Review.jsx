import React from 'react';

const Reviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <div>No reviews yet</div>;
  }

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id}>
          <h3>{review.title}</h3>
          <p>{review.content}</p>
          <p>Rating: {review.rating}</p>
          <p>Likes: {review.like_count} Dislikes: {review.unlike_count}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
