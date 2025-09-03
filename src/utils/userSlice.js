import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage if available
const storedUser = JSON.parse(localStorage.getItem("user"));

const userSlice = createSlice({
  name: "user",
  initialState: storedUser || null,
  reducers: {
    addUser: (state, action) => {
      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    removeUser: () => {
      // Remove user from localStorage on logout
      localStorage.removeItem("user");
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
