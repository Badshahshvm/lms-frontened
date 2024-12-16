import { configureStore } from "@reduxjs/toolkit";
// Import your reducers here
// Example: import userReducer from './features/userSlice';

export const appStore = configureStore({
              reducer: {
                            auth: auth
              },
});

// Export types for use in your application (if using
