import React from 'react';
import { Rect } from 'react-konva';
import { useSelector } from 'react-redux';
import { selectLeftTank } from '../../../features/LeftTank';

const LeftBullet = () => {
	const leftTankData = useSelector(selectLeftTank);
	const bulletX = leftTankData.bulletXLeft;
	const bulletY = leftTankData.bulletYLeft;
	const bulletFired = leftTankData.bulletFiredLeft;

	return (
		<>
			{
				bulletFired && (
					<Rect
						x={bulletX}
						y={bulletY}
						width={10}
						height={10}
						fill="red"
					/>
				)
			}
		</>
	);
};

export default LeftBullet;



