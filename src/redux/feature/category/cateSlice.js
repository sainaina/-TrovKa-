  // cateSlice.js
  import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
  import { getAccessToken } from "../../../lib/secureLocalStorage";

  const initialState = {
    categoryTypes: [],
    categories: [],
    status: "idle",
    error: null,
  };

  const fetchAllPages = async (url, token) => {
    let results = [];
    let nextUrl = url;
  
    while (nextUrl) {
      // Ensure the URL uses HTTPS
      nextUrl = nextUrl.replace(/^http:/, "https:");
  
      const response = await fetch(nextUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch data");
      }
  
      const data = await response.json();
      results = results.concat(data.results);
      nextUrl = data.next;
    }
  
    return results;
  };

  export const fetchCategoryTypes = createAsyncThunk(
    "categories/fetchCategoryTypes",
    async (_, { rejectWithValue }) => {
      const token = getAccessToken();
      const baseUrl = `${import.meta.env.VITE_BASE_URL}category-types/`;
      try {
        const data = await fetchAllPages(baseUrl, token);
        return data;
      } catch (error) {
        return rejectWithValue(error.message || error);
      }
    }
  );

  export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
      const token = getAccessToken();
      const baseUrl = `${import.meta.env.VITE_BASE_URL}categories/`;
      try {
        const data = await fetchAllPages(baseUrl, token);
        return data;
      } catch (error) {
        return rejectWithValue(error.message || error);
      }
    }
  );


  const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCategoryTypes.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchCategoryTypes.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.categoryTypes = action.payload;
        })
        .addCase(fetchCategoryTypes.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        .addCase(fetchCategories.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.categories = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });
    },
  });

  export default categoriesSlice.reducer;
  export const selectCategoryTypes = (state) => state.categories.categoryTypes;
  export const selectCategories = (state) => state.categories.categories;
  export const selectCategoriesStatus = (state) => state.categories.status;
  export const selectCategoriesError = (state) => state.categories.error;
