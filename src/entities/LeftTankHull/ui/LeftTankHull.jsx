import React, { useEffect, useState, useRef } from 'react';
import { Rect, Group, Ellipse, Circle } from 'react-konva';
import { useSelector, useDispatch } from 'react-redux';
import { selectLeftTank } from '../../../features/LeftTank';
import { setLeftBulletX, setLeftBulletY, setLeftInitial_X, setLeftInitial_Y, setLeftTankRect, setLeftTankEllipse } from '../../../features/LeftTank';
import { tankLeftRectTankLeftGeometry } from '../model/getTankLeftGeometry';
import Konva from 'konva';

const LeftTankHull = ({ randomDistanceLeft }) => {

	const [x, setX] = useState(0);
	const [isTankStopped, setIsTankStopped] = useState(false); // Флаг для определения, остановился ли танк
	const animationRef = useRef();

	const angle = useSelector(selectLeftTank).angleLeft;
	const adjustedAngle = isNaN(angle) ? (- 90) : (180 + 90 - angle);
	const dispatch = useDispatch();

	useEffect(() => {
		if (x >= randomDistanceLeft) {
			animationRef.current.stop();
			setIsTankStopped(true); // Устанавливаем флаг в true, когда танк остановился
		}
	}, [randomDistanceLeft, x]);

	useEffect(() => {
		animationRef.current = new Konva.Animation((frame) => {
			setX((prevX) => prevX + 0.8); // Измените этот параметр на скорость движения
		});
		animationRef.current.start();

		return () => {
			animationRef.current.stop();
		};
	}, []);

	useEffect(() => {
		if (isTankStopped) {
			const { tankLeftRect, tankLeftEllipse } = tankLeftRectTankLeftGeometry(x, y, gunWidth, towerWidth, towerHeight, rectangleWidth, rectangleHeight);
			const newBulletX = calculateNewBulletX(adjustedAngle);
			const newBulletY = calculateNewBulletY(adjustedAngle);
			dispatch(setLeftBulletX(newBulletX));
			dispatch(setLeftBulletY(newBulletY));
			dispatch(setLeftInitial_X(newBulletX));
			dispatch(setLeftInitial_Y(newBulletY));
			dispatch(setLeftTankRect(tankLeftRect));
			dispatch(setLeftTankEllipse(tankLeftEllipse));
		}
	}, [isTankStopped, adjustedAngle, dispatch]);

	const gunLength = 40;
	const gunWidth = 5;
	const towerWidth = 50;
	const towerHeight = 20;
	const rectangleWidth = 80;
	const rectangleHeight = 10;
	const wheelDiameter = 16;
	const wheelDistance = 0;
	//const x = 150;
	const y = window.innerHeight - 50

	const calculateNewBulletX = (adjustedAngle) => {
		const gunEndX = x - gunWidth / 2;
		return gunEndX - Math.sin((adjustedAngle * Math.PI) / 180) * gunLength - 8;
	};

	const calculateNewBulletY = (adjustedAngle) => {
		const gunEndY = y + 2.5;
		return gunEndY + Math.cos((adjustedAngle * Math.PI) / 180) * gunLength - 8;
	};

	return (
		<Group>
			{/* Дуло танка */}
			<Rect x={x - gunWidth / 2} y={y + 2.5} width={gunWidth} height={gunLength} fill="gray" rotation={adjustedAngle} />
			{/* Башня танка */}
			<Ellipse
				x={x - gunWidth / 2 - 10} // начало башни находится в конце дула (левая сторона)
				y={y + 2}
				radiusX={towerWidth / 2}
				radiusY={towerHeight / 2}
				fill="gray"
			/>

			{/* Колеса */}
			{Array.from({ length: 5 }).map((_, index) => (
				<Group key={index}>
					<Ellipse
						x={x - gunWidth / 2 - 18 + rectangleWidth / 2 - index * (wheelDiameter - wheelDistance)}
						y={y + towerHeight + wheelDiameter / 2 - 2}
						radiusX={wheelDiameter / 2}
						radiusY={wheelDiameter / 2}
						fill="#444"
					/>
					{/* Точка в середине колеса */}
					<Circle
						x={x - gunWidth / 2 - 18 + rectangleWidth / 2 - index * (wheelDiameter - wheelDistance)}
						y={y + towerHeight + wheelDiameter / 2 - 2}
						radius={1}
						fill="white"
					/>
				</Group>
			))}
			{/* Прямоугольник под башней */}
			<Rect
				x={x - gunWidth / 2 - 10 - rectangleWidth / 2}
				y={y + towerHeight / 2}
				width={rectangleWidth}
				height={rectangleHeight}
				cornerRadius={5}
				fill="gray"
			/>
		</Group>
	);
};

export default LeftTankHull;
