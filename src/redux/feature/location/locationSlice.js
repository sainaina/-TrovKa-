import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccessToken } from "../../../lib/secureLocalStorage";

const initialState = {
  locations: [],
  status: "idle", // or "loading", "succeeded", "failed"
  error: null,
};

// Post new location
export const postLocation = createAsyncThunk(
  "locations/postLocation",
  async (locationData, { rejectWithValue }) => {
    const token = getAccessToken();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}locations/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(locationData)
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }

      const data = await response.json();
      return data; // Assuming the location data is returned in the response
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

// Fetch all locations
export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async (_, { rejectWithValue }) => {
    const token = getAccessToken();
    let allLocations = [];
    let url = `${import.meta.env.VITE_BASE_URL}locations/`;

    try {
      while (url) {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const error = await response.json();
          return rejectWithValue(error);
        }

        const data = await response.json();
        allLocations = allLocations.concat(data.results); // Assuming the API response has a "results" field
        url = data.next; // Move to the next page, assuming "next" field contains the URL for next page
      }
      return allLocations;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postLocation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postLocation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.locations.push(action.payload); // Assuming payload is the new location object
      })
      .addCase(postLocation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchLocations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.locations = action.payload; // Assuming payload is an array of locations
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default locationsSlice.reducer;

// Selectors
export const selectLocations = (state) => state.location.locations;
export const selectLocationsStatus = (state) => state.location.status;
export const selectLocationsError = (state) => state.location.error;
