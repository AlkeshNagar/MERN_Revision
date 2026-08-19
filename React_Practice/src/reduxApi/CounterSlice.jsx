import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  value: 0,
};

// createSlice(): Creates a modular piece of the state layout by auto-generating your action creators and matching reducers in a single step.
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer