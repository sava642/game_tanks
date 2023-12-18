import { leftTankReducer } from "./model/slice/leftTankSlice";
import { selectLeftTank } from "./model/selectors/getLeftTankData"
import LeftTank from "./ui/LeftTank";
import {
	setLeftAngle, setLeftPower, setLeftBulletX, setLeftBulletY, resetLeftBullet, setLeftInitial_X, setLeftInitial_Y, setLeftBulletFired, setLeftTankRect,
	setLeftTankEllipse, setTankLeftWin, setLeftTankName
} from "./model/slice/leftTankSlice";
export {
	leftTankReducer,
	LeftTank,
	selectLeftTank,
	setLeftAngle,
	setLeftPower,
	setLeftBulletX,
	setLeftBulletY,
	resetLeftBullet,
	setLeftInitial_X,
	setLeftInitial_Y,
	setLeftBulletFired,
	setLeftTankRect,
	setLeftTankEllipse,
	setTankLeftWin,
	setLeftTankName,

}