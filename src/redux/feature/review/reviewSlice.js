import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccessToken } from "../../../lib/secureLocalStorage";
const initialState = {
  reviews: [],
  userActions: {}, // Track user actions by review ID and user ID
  status: "idle",
  error: null,
};

// Helper function to recursively fetch all pages of reviews
const fetchAllReviews = async (url, token, allReviews = []) => {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }

    const data = await response.json();
    allReviews = allReviews.concat(data.results);

    if (data.next) {
      return await fetchAllReviews(data.next, token, allReviews);
    }

    return allReviews;
  } catch (err) {
    throw err;
  }
};

// Fetch all reviews
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (_, { rejectWithValue }) => {
    const token = getAccessToken();
    const url = `${import.meta.env.VITE_BASE_URL}reviews/`;
    try {
      const allReviews = await fetchAllReviews(url, token);
      return allReviews;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Fetch reviews for a specific service
export const fetchServiceReviews = createAsyncThunk(
  "reviews/fetchServiceReviews",
  async (serviceId, { rejectWithValue }) => {
    const token = getAccessToken();
    const url = `${import.meta.env.VITE_BASE_URL}reviews/?service_id=${serviceId}`;
    try {
      const allReviews = await fetchAllReviews(url, token);
      return allReviews;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Post a new review
export const postReview = createAsyncThunk(
  "reviews/postReview",
  async (review, { rejectWithValue }) => {
    const token = getAccessToken();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to post review");
      }

      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Like a review
export const likeReview = createAsyncThunk(
  "reviews/likeReview",
  async (reviewId, { rejectWithValue }) => {
    const token = getAccessToken();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}likes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ review: reviewId }),
      });

      if (!response.ok) {
        throw new Error("Failed to like review");
      }

      return reviewId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Unlike a review
export const unlikeReview = createAsyncThunk(
  "reviews/unlikeReview",
  async (reviewId, { rejectWithValue }) => {
    const token = getAccessToken();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}unlikes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ review: reviewId }),
      });

      if (!response.ok) {
        throw new Error("Failed to unlike review");
      }

      return reviewId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setUserAction: (state, action) => {
      const { reviewId, userId, actionType } = action.payload;
      if (!state.userActions[reviewId]) {
        state.userActions[reviewId] = {};
      }
      state.userActions[reviewId][userId] = actionType;
    },
    updateReviewLikeDislike: (state, action) => {
      const { id, liked, disliked } = action.payload;
      const review = state.reviews.find((review) => review.id === id);
      if (review) {
        if (liked) {
          review.like_count += 1;
          review.unlike_count = Math.max(0, review.unlike_count - 1);
        } else if (disliked) {
          review.unlike_count += 1;
          review.like_count = Math.max(0, review.like_count - 1);
        }
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchServiceReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServiceReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload;
      })
      .addCase(fetchServiceReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(postReview.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(likeReview.fulfilled, (state, action) => {
        const reviewId = action.payload;
        const review = state.reviews.find((review) => review.id === reviewId);
        if (review) {
          review.like_count += 1;
        }
      })
      .addCase(unlikeReview.fulfilled, (state, action) => {
        const reviewId = action.payload;
        const review = state.reviews.find((review) => review.id === reviewId);
        if (review) {
          review.unlike_count += 1;
        }
      });
  },
});

export const { setUserAction, updateReviewLikeDislike } = reviewsSlice.actions;

export const selectReviews = (state) => state.reviews.reviews;
export const selectUserActions = (state) => state.reviews.userActions;
export const selectReviewsStatus = (state) => state.reviews.status;
export const selectReviewsError = (state) => state.reviews.error;

export default reviewsSlice.reducer;
