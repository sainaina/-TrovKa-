import secureLocalStorage from "react-secure-storage";

// Log environment variable for debugging
// console.log('Secure Storage Prefix:', import.meta.env.VITE_SECURE_LOCAL_STORAGE_PREFIX);

const storageKey = import.meta.env.VITE_SECURE_LOCAL_STORAGE_PREFIX;

// Add access token to local storage
export const storeAccessToken = (accessToken) => {
    secureLocalStorage.setItem(storageKey, accessToken);
};

// Add email to local storage
export const storeEmail = (email) => {
    secureLocalStorage.setItem('email', email);
};

// Get access token
export const getAccessToken = () => {
    const token = secureLocalStorage.getItem(storageKey);
    return token;
};

// Remove access token
export const removeAccessToken = () => {
    secureLocalStorage.removeItem(storageKey);
};
