import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [], // ✅ start with empty array
  reducers: {
    addFeed: (state, action) => {
      return action.payload; // replace with new feed array
    },
    removeFeed: (state,action) => {
          const newArray = state.filter((req) => req._id !== action.payload);
          return newArray;
        },
    removeAllFeed: () => {
      return [];
    }
  },
});

export const { addFeed, removeFeed,removeAllFeed } = feedSlice.actions;
export default feedSlice.reducer;