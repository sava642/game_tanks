import { configureStore } from '@reduxjs/toolkit';
import { leftTankReducer } from '../features/LeftTank';
import { rightTankReducer } from '../features/RightTank';
import { hillSliceReducer } from '../entities/Hill/model/slice/hillSlice';
import { runningGameSliceReducer } from '../features/RunningGame';

const store = configureStore({
	reducer: {
		leftTank: leftTankReducer,
		rightTank: rightTankReducer,
		hill: hillSliceReducer,
		game: runningGameSliceReducer,
	}
});

export default store;