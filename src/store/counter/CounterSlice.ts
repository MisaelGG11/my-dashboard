import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
  isReady: boolean; // Flag to check if the counter has been initialized
}

const initialState: CounterState = {
  value: 0,
  isReady: false,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    initCounterState(state, action: PayloadAction<number>) {
      if ( state.isReady ) return;
      
      state.value = action.payload;
      state.isReady = true;
    },
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      if (state.value <= 0) {
        return;
      }
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      if (action.payload < 0) {
        action.payload = 0;
      }

      state.value += action.payload
    },

    resetCounter(state, action: PayloadAction<number>) {
      if (action.payload < 0) {
        action.payload = 0;
      }

      state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { initCounterState, increment, decrement, incrementByAmount, resetCounter } = counterSlice.actions

export default counterSlice.reducer