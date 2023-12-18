import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	angleRight: 45,
	powerRight: 100,
	initialBulletXRight: 0,
	initialBulletYRight: 0,
	bulletXRight: 0,
	bulletYRight: 0,
	bulletFiredRight: false,
	tankRightRect: {},
	tankRightEllipse: {},
	tankRightWin: false,
	nameRightTank: '',
};

const rightTankSlice = createSlice({
	name: 'rightTank',
	initialState,
	reducers: {
		setRightAngle: (state, action) => {
			state.angleRight = action.payload;
			state.initialBulletXRight = state.bulletXRight;
			state.initialBulletXRight = state.bulletYRight;
		},
		setRightPower: (state, action) => {
			state.powerRight = action.payload;
		},
		setRightInitial_X: (state, action) => {
			state.initialBulletXRight = action.payload;
		},
		setRightInitial_Y: (state, action) => {
			state.initialBulletYRight = action.payload;
		},
		setRightBulletX: (state, action) => {
			state.bulletXRight = action.payload;
		},
		setRightBulletY: (state, action) => {
			state.bulletYRight = action.payload;
		},
		setRightBulletFired: (state, action) => {
			state.bulletFiredRight = action.payload;
		},
		resetRightBullet: (state) => {
			state.bulletXRight = state.initialBulletXRight;
			state.bulletYRight = state.initialBulletYRight;
		},
		setRightTankRect: (state, action) => {
			return {
				...state,
				tankRightRect: action.payload,
			};
		},
		setRightTankEllipse: (state, action) => {
			return {
				...state,
				tankRightEllipse: action.payload,
			};
		},
		setTankRightWin: (state, action) => {
			state.tankRightWin = action.payload;
		},
		setRightTankName: (state, action) => {
			state.nameRightTank = action.payload;
		},
	},
});

export const {
	setRightAngle,
	setRightPower,
	setRightBulletX,
	setRightBulletY,
	setRightBulletFired,
	resetRightBullet,
	setRightInitial_X,
	setRightInitial_Y,
	setRightTankRect,
	setRightTankEllipse,
	setTankRightWin,
	setRightTankName
} = rightTankSlice.actions;

export const rightTankReducer = rightTankSlice.reducer;
