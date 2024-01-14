
import React, { useCallback, useEffect, useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import Konva from 'konva';
import { LeftBullet } from '../../../entities/LeftBullet';
import { useSelector, useDispatch } from 'react-redux';
import { selectLeftTank } from '../model/selectors/getLeftTankData';
import { setLeftBulletFired, setLeftBulletX, setLeftBulletY, resetLeftBullet } from '../model/slice/leftTankSlice';
import { Hill } from '../../../entities/Hill';
import { createExplosion } from '../../../entities/createExplotion';
import { LeftTankHull } from '../../../entities/LeftTankHull';

function LeftTank() {
	const leftTankData = useSelector(selectLeftTank);
	const dispatch = useDispatch();
	const bulletFired = leftTankData.bulletFired;
	const angle = leftTankData.angle;
	const power = leftTankData.power;
	const bulletX = leftTankData.bulletX;
	const bulletY = leftTankData.bulletY;
	const layerRef = useRef();
	const animationRef = useRef();
	const height = window.innerHeight;
	const width = window.innerWidth;

	const handleKeyPress = useCallback((e) => {
		if (e.key === 'Enter' && !bulletFired) {
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
		dispatch(setLeftBulletFired(true));
		const gravity = 9.8;
		const angleInRadians = (angle * Math.PI) / 180;

		const newAnimation = new Konva.Animation((frame) => {
			const time = frame.time / 1000;
			const speedX = power * Math.cos(angleInRadians);
			const speedY = power * Math.sin(angleInRadians) - gravity * time;
			console.log(bulletX, bulletY)
			const newBulletX = bulletX + speedX * time;
			const newBulletY = bulletY - speedY * time + (1 / 2) * gravity * time * time;

			const checkCollision = (x, y, hillShape) => {
				return hillShape.intersects({
					x: x,
					y: y,
				});
			};

			const hillShape = layerRef.current?.children.find(child => child.name() === "hillShape");

			if (checkCollision(newBulletX, newBulletY, hillShape)) {
				createExplosion(layerRef, newBulletX, newBulletY)
				animationRef.current.stop();
				dispatch(setLeftBulletFired(false));
				dispatch(resetLeftBullet());
			} else if (
				newBulletY >= height ||
				newBulletX >= width ||
				newBulletY <= 0 ||
				newBulletX <= 0
			) {
				animationRef.current.stop();
				dispatch(setLeftBulletFired(false));
				dispatch(resetLeftBullet());
			} else {
				dispatch(setLeftBulletX(newBulletX));
				dispatch(setLeftBulletY(newBulletY));
			}
		}, layerRef.current);
		animationRef.current = newAnimation;
		newAnimation.start();
	};
	return (
		<div className="stage-container">
			<Stage className="custom-stage" width={width} height={height}>
				<Layer ref={layerRef}>
					<Hill layerRef={layerRef} />
					<LeftTankHull />
					<LeftBullet />
				</Layer>
			</Stage>
		</div>
	);
};
export default LeftTank;
