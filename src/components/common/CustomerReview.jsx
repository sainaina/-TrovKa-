import React from 'react';

const CustomerReview = ({ reviews, reviewsStatus }) => {
  if (reviewsStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (reviewsStatus === 'failed') {
    return <div>Error loading reviews</div>;
  }

  if (reviews.length === 0) {
    return <div>No reviews available for these services.</div>;
  }

  // Calculate the count and width for each rating
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach(review => {
    if (review.rate_star >= 1 && review.rate_star <= 5) {
      ratingCounts[review.rate_star - 1]++;
    }
  });

  const totalReviews = reviews.length;
  const ratings = ratingCounts.map((count, index) => ({
    rating: index + 1,
    count: count,
    width: totalReviews ? `${(count / totalReviews) * 100}%` : '0%',
  }));

  // Calculate the average rating
  const averageRating = (ratingCounts.reduce((sum, count, index) => sum + count * (index + 1), 0) / totalReviews).toFixed(1);

  return (
    <div className="py-5 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-5 lg:px-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-10 border-b border-gray-200">
          <div className="flex flex-col gap-y-4">
            {ratings.map((item, index) => (
              <div className="flex items-center" key={index}>
                <p className="font-semibold text-lg text-gray-900">{item.rating}</p>
                <svg className="ml-1 text-amber-400" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                  />
                </svg>
                <div className="flex-1 mx-4 bg-amber-100 rounded-full">
                  <div className="h-2 bg-amber-400 rounded-full" style={{ width: item.width }}></div>
                </div>
                <p className="font-semibold text-lg text-gray-900">{item.count}</p>
              </div>
            ))}
          </div>
          <div className="p-6 bg-amber-50 rounded-lg flex flex-col items-center">
            <h2 className="text-6xl font-bold text-amber-400 mb-4">{averageRating}</h2>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="text-amber-400" width="36" height="36" viewBox="0 0 36 36" fill="currentColor">
                  <path
                    d="M21.1033 2.9166C21.4701 2.17335 22.5299 2.17335 22.8967 2.9166L28.233 13.729C28.3786 14.0241 28.6602 14.2287 28.9859 14.276L40.9181 16.0099C41.7383 16.1291 42.0658 17.137 41.4723 17.7156L32.8381 26.1318C32.6024 26.3616 32.4949 26.6926 32.5505 27.017L34.5888 38.9009C34.7289 39.7178 33.8714 40.3408 33.1378 39.9551L22.4653 34.3443C22.174 34.1911 21.826 34.1911 21.5347 34.3443L10.8622 39.9551C10.1286 40.3408 9.27114 39.7178 9.41125 38.9009L11.4495 27.017C11.5051 26.6926 11.3976 26.3616 11.1619 26.1318L2.52771 17.7156C1.93419 17.137 2.2617 16.1291 3.08192 16.0099L15.0141 14.276C15.3398 14.2287 15.6214 14.0241 15.767 13.729L21.1033 2.9166Z"
                  />
                </svg>
              ))}
            </div>
            <p className="text-3xl font-bold text-amber-400">Average Rating</p>
          </div>
        </div>
        <div className="mt-10">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-4 mb-4">
              <p className="text-gray-500 text-sm font-bold">{review.created_by}</p>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={i < review.rate_star ? "text-amber-400" : "text-gray-300"}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                    />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
