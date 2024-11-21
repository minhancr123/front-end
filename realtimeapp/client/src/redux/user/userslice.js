import { createSlice, configureStore } from "@reduxjs/toolkit";
const initialState = {
  currentplayer: null,
  loading: false,
  error: null,
};

const userslice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    signing: (state, action) => {
      state.currentplayer = action.payload;
      state.loading = true;
      state.error = null;
    },
    signinsucessfull: (state, action) => {
      state.currentplayer = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { signinsucessfull, signing } = userslice.actions;

export const store = configureStore({
  reducer: {
    user: userslice.reducer,
  },
});
export default userslice.reducer;
