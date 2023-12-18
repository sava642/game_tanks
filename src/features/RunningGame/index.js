import { runningGameSliceReducer } from "./model/slice/runningGameSlice";
import { selectRunningGameData } from "./model/selectors/getRunningGameData";
import { showScreen, startGame, endGame } from "./model/slice/runningGameSlice"
export {
	runningGameSliceReducer,
	selectRunningGameData,
	showScreen,
	startGame,
	endGame
}