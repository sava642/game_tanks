import React from 'react';
import { Rect } from 'react-konva';
import { useSelector } from 'react-redux';
import { selectRightTank } from '../../../features/RightTank';

const RightBullet = () => {
	const rightTankData = useSelector(selectRightTank);
	const bulletX = rightTankData.bulletXRight;
	const bulletY = rightTankData.bulletYRight;
	const bulletFired = rightTankData.bulletFiredRight;

	return (
		<>
			{bulletFired && (
				<Rect
					x={bulletX}
					y={bulletY}
					width={10}
					height={10}
					fill="orange"
				/>
			)}
		</>
	);
};

export default RightBullet;
