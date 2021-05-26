import { createSlice } from "@reduxjs/toolkit";

// this stores information about the user and can be accessed by all nested components
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      //made ready to accept input data
      state.user = action.payload;
    },
    logout: (state) => {
      //set to null , to return user as null when logged in
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

//this arrow function allows us to pull data from the data layer into a component(userSlice to be specific)
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
