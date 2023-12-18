// hillSlice.js
import { createSlice } from '@reduxjs/toolkit';

const hillSlice = createSlice({
	name: 'hill',
	initialState: {
		hillShapeRef: null,
	},
	reducers: {
		setHillShapeRef: (state, action) => {
			state.hillShapeRef = action.payload;
		},
	},
});

export const { setHillShapeRef } = hillSlice.actions;
export const hillSliceReducer = hillSlice.reducer;
