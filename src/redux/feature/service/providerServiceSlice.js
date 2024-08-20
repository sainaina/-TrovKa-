// src/redux/features/services/servicesSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccessToken } from "../../../lib/secureLocalStorage";

const initialState = {
  services: [],
  status: "idle",
  error: null,
  uploadStatus: "idle",
  uploadError: null,
  uploadedImageUrl: null,
};

// Fetch user services
export const fetchProviderServices = createAsyncThunk(
  "proservices/fetchProviderServices",
  async (_, { rejectWithValue }) => {
    const token = getAccessToken();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}services/my_services/`, {
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
      return data.data; // Assuming the services are in the `data` property
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Post new service
export const postService = createAsyncThunk(
  "proservices/postService",
  async (serviceData, { rejectWithValue }) => {
    const token = getAccessToken();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}services/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(serviceData)
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }

      const data = await response.json();
      return data; // Assuming the service data is returned in the response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Delete service
export const deleteService = createAsyncThunk(
  "proservices/deleteService",
  async (serviceId, { rejectWithValue }) => {
    const token = getAccessToken();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}services/${serviceId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }

      return serviceId; // Return the deleted service ID
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Upload image
export const uploadImage = createAsyncThunk(
  'services/uploadImage',
  async (imageFile, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}upload/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload image');
      }

      const data = await response.json();
      console.log('Image upload response:', data);
      const imageUrl = data.data.url; // Ensure this path matches your API response
      return imageUrl;
    } catch (error) {
      console.error('Image upload error:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateService = createAsyncThunk(
  "proservices/updateService",
  async ({ serviceId, serviceData }, { rejectWithValue }) => {
    const token = getAccessToken();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}services/${serviceId}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(serviceData)
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }

      const data = await response.json();
      return data; // Assuming the updated service data is returned in the response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const servicesSlice = createSlice({
  name: "proservices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviderServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProviderServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = action.payload;
      })
      .addCase(fetchProviderServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(postService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services.push(action.payload);
      })
      .addCase(postService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(uploadImage.pending, (state) => {
        state.uploadStatus = "loading";
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.uploadStatus = "succeeded";
        state.uploadedImageUrl = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploadStatus = "failed";
        state.uploadError = action.payload;
      })
      .addCase(updateService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.services.findIndex(service => service.id === action.payload.id);
        if (index !== -1) {
          state.services[index] = action.payload;
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

  },
});

// Export reducer
export default servicesSlice.reducer;

// Export selectors
export const selectServices = (state) => state.proservices.services;
export const selectServicesStatus = (state) => state.proservices.status;
export const selectServicesError = (state) => state.proservices.error;
export const selectUploadStatus = (state) => state.proservices.uploadStatus;
export const selectUploadedImageUrl = (state) => state.proservices.uploadedImageUrl;
export const selectUploadError = (state) => state.proservices.uploadError;
