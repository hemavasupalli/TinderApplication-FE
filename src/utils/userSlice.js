import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage safely
const storedUserRaw = localStorage.getItem("user");
const storedUser = storedUserRaw && storedUserRaw !== "undefined" ? JSON.parse(storedUserRaw) : null;

const userSlice = createSlice({
  name: "user",
  initialState: storedUser,
  reducers: {
    addUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    removeUser: () => {
      localStorage.removeItem("user");
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
