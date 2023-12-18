import { rightTankReducer } from "./model/slice/rightTankSlice";
import { selectRightTank } from "./model/selectors/getRightTankData";
import RightTank from "./ui/RightTank";
import {
	setRightAngle, setRightPower, setRightBulletX, setRightBulletY, resetRightBullet, setRightInitial_X, setRightInitial_Y, setRightBulletFired, setRightTankRect, setRightTankEllipse, setTankRightWin, setRightTankName
} from "./model/slice/rightTankSlice";
export {
	rightTankReducer,
	RightTank,
	selectRightTank,
	setRightAngle,
	setRightPower,
	resetRightBullet,
	setRightInitial_X,
	setRightInitial_Y,
	setRightBulletX,
	setRightBulletY,
	setRightBulletFired,
	setRightTankRect,
	setRightTankEllipse,
	setTankRightWin,
	setRightTankName
}