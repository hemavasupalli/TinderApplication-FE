import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: [], 
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removeRequest: (state,action) => {
      const newArray = state.filter((req) => req._id !== action.payload);
      return newArray;
    },
    removeAllRequests: () => {
      return [];
    }
  },
});

export const { addRequest, removeRequest ,removeAllRequests } = requestSlice.actions;
export default requestSlice.reducer;