import React, { useCallback, useEffect, useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import Konva from 'konva';
import { RightBullet } from '../../../entities/RightBullet';
import { useSelector, useDispatch } from 'react-redux';
import { selectRightTank } from '../model/selectors/getRightTankData';
import { setRightBulletFired, setRightBulletX, setRightBulletY, resetRightBullet } from '../model/slice/rightTankSlice';
import { Hill } from '../../../entities/Hill';
import { createExplosion } from '../../../entities/createExplotion';
import { RightTankHull } from '../../../entities/RightTankHull';

function RightTank() {
	const rightTankData = useSelector(selectRightTank);
	const dispatch = useDispatch();
	const bulletFired = rightTankData.bulletFired;
	const angle = rightTankData.angle;
	const power = rightTankData.power;
	const bulletX = rightTankData.bulletX;
	const bulletY = rightTankData.bulletY;

	const stageRef = useRef();  // Используем отдельный ref для Stage
	const layerRef = useRef();
	const animationRef = useRef();
	const height = window.innerHeight;
	const width = window.innerWidth;

	const handleKeyPress = useCallback((e) => {
		if (e.key === ' ' && !bulletFired) {
			if (isNaN(angle) || isNaN(power) || angle === "" || power === "") {
				alert("Please enter valid numeric values for angle and power in English.");
			} else {
				fireAndAnimateBullet(angle, power, bulletX, bulletY);
			}
		}
	}, [bulletFired, angle, power, bulletX, bulletY]);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [handleKeyPress]);

	const fireAndAnimateBullet = (angle, power, bulletX, bulletY) => {
		if (animationRef.current) {
			animationRef.current.stop();
		}
		dispatch(setRightBulletFired(true));
		const gravity = 9.8;
		const angleInRadians = (angle * Math.PI) / 180;

		const newAnimation = new Konva.Animation((frame) => {
			const time = frame.time / 1000;
			const speedX = power * Math.cos(angleInRadians);
			const speedY = power * Math.sin(angleInRadians) - gravity * time;
			console.log(bulletX, bulletY);
			const newBulletX = bulletX + speedX * time;
			const newBulletY = bulletY - speedY * time + (1 / 2) * gravity * time * time;

			const checkCollision = (x, y, hillShape) => {
				return hillShape.intersects({
					x: x,
					y: y,
				});
			};

			const hillShape = layerRef.current?.children.find((child) => child.name() === "hillShape");

			if (checkCollision(newBulletX, newBulletY, hillShape)) {
				console.log('Столкновение');
				createExplosion(layerRef, newBulletX, newBulletY);
				animationRef.current.stop();
				dispatch(setRightBulletFired(false));
				dispatch(resetRightBullet());
			} else if (newBulletY >= height || newBulletX >= width || newBulletY <= 0 || newBulletX <= 0) {
				animationRef.current.stop();
				dispatch(setRightBulletFired(false));
				dispatch(resetRightBullet());
			} else {
				dispatch(setRightBulletX(newBulletX));
				dispatch(setRightBulletY(newBulletY));
			}
		}, layerRef.current);
		animationRef.current = newAnimation;
		newAnimation.start();
	};

	return (
		<div className="stage-container">
			<Stage className="custom-stage" width={width} height={height} ref={stageRef}>
				<Layer ref={layerRef}>
					<Hill layerRef={layerRef} />
					<RightTankHull />
					<RightBullet />
				</Layer>
			</Stage>
		</div>
	);
}

export default RightTank;
