import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { nickname: "", places: [] },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addNickname: (state, action) => {
      state.value.nickname = action.payload;
    },
    addCity: (state, action) => {
      state.value.places.push(action.payload);
    },
    removeCity: (state, action) => {
      state.value.places = state.value.places.filter(
        (city) => city.name !== action.payload
      );
    },
  },
});

export const { addNickname, addCity, removeCity } = userSlice.actions;
export default userSlice.reducer;
