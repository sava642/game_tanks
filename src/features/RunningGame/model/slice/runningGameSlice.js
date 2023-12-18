import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isScreenVisible: true,
	isGameRunning: false,
};

const runningGameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		showScreen: (state) => {
			state.isScreenVisible = true;
			state.isGameRunning = false;
		},
		startGame: (state) => {
			state.isScreenVisible = false;
			state.isGameRunning = true;
		},
		endGame: (state) => {
			state.isScreenVisible = true;
			state.isGameRunning = false;
		},
	},
});

export const { showScreen, startGame, endGame } = runningGameSlice.actions;
export const runningGameSliceReducer = runningGameSlice.reducer;
