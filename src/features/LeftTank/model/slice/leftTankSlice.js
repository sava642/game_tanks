import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	angleLeft: 45,
	powerLeft: 100,
	initialBulletXLeft: 0,
	initialBulletYLeft: 0,
	bulletXLeft: 0,
	bulletYLeft: 0,
	bulletFiredLeft: false,
	tankLeftRect: {},
	tankLeftEllipse: {},
	tankLeftWin: false,
	nameLeftTank: '',
	isLeftTankStopped: false,
};

const leftTankSlice = createSlice({
	name: 'leftTank',
	initialState,
	reducers: {
		setLeftAngle: (state, action) => {
			state.angleLeft = action.payload;
			state.initialBulletXLeft = state.bulletXLeft;
			state.initialBulletXLeft = state.bulletYLeft;
		},
		setLeftPower: (state, action) => {
			state.powerLeft = action.payload;
		},
		setLeftInitial_X: (state, action) => {
			state.initialBulletXLeft = action.payload;
		},
		setLeftInitial_Y: (state, action) => {
			state.initialBulletYLeft = action.payload;
		},
		setLeftBulletX: (state, action) => {
			state.bulletXLeft = action.payload;
		},
		setLeftBulletY: (state, action) => {
			state.bulletYLeft = action.payload;
		},
		setLeftBulletFired: (state, action) => {
			state.bulletFiredLeft = action.payload;
		},
		resetLeftBullet: (state) => {
			state.bulletXLeft = state.initialBulletXLeft;
			state.bulletYLeft = state.initialBulletYLeft;
		},
		setLeftTankRect: (state, action) => {
			return {
				...state,
				tankLeftRect: action.payload,
			};
		},
		setLeftTankEllipse: (state, action) => {
			return {
				...state,
				tankLeftEllipse: action.payload,
			};
		},
		setTankLeftWin: (state, action) => {
			state.tankLeftWin = action.payload;
		},
		setLeftTankName: (state, action) => {
			state.nameLeftTank = action.payload;
		},
		setIsLeftTankStopped: (state, action) => {
			state.isLeftTankStopped = action.payload;
		},
	},
});

export const {
	setLeftAngle,
	setLeftPower,
	setLeftBulletX,
	setLeftBulletY,
	setLeftBulletFired,
	resetLeftBullet,
	setLeftInitial_X,
	setLeftInitial_Y,
	setLeftTankRect,
	setLeftTankEllipse,
	setTankLeftWin,
	setLeftTankName,
	setIsLeftTankStopped,
} = leftTankSlice.actions;

export const leftTankReducer = leftTankSlice.reducer;
