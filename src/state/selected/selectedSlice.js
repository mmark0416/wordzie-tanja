import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: [],
  lastWork: "",
};

const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    addSelected: (state, action) => {
      state.selected.push(action.payload);
    },
    removeSelected: (state, action) => {
      state.selected = state.selected.filter((word) => word !== action.payload);
    },
    clearSelected: (state) => {
      state.selected = [];
    },
    addLastWork: (state, action) => {
      state.lastWork = action.payload;
    },
    disableLastWork: (state) => {
      state.lastWork = "";
    },
  },
});

export const { addSelected, removeSelected, clearSelected, addLastWork, disableLastWork } =
  selectedSlice.actions;

export default selectedSlice.reducer;
