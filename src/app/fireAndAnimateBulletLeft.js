import Konva from 'konva';
import { createExplosion } from '../entities/createExplotion';
import { setLeftBulletFired, setLeftBulletX, setLeftBulletY, resetLeftBullet, setTankLeftWin } from '../features/LeftTank';
import { setTankRightWin } from '../features/RightTank';

export const fireAndAnimateBulletLeft = (dispatch, layerRef, animationRef, angle, power, bulletX, bulletY, tankRightRect, tankRightEllipse, tankLeftRect, tankLeftEllipse) => {
	const explosionSound = new Audio('./explosion.mp3');
	const shootSound = new Audio('./shoot.mp3');
	shootSound.play()
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
		const newBulletX = bulletX + speedX * time;
		const newBulletY = bulletY - speedY * time + (1 / 2) * gravity * time * time;
		const checkCollision = (x, y, hillShape, tankRightRect, tankRightEllipse, tankLeftRect, tankLeftEllipse) => {
			const bulletRect = {
				x,
				y,
				width: 1,
				height: 1,
			};

			const isBulletInRightTankRect = (
				bulletRect.x < tankRightRect.x + tankRightRect.width &&
				bulletRect.x + bulletRect.width > tankRightRect.x &&
				bulletRect.y < tankRightRect.y + tankRightRect.height &&
				bulletRect.y + bulletRect.height > tankRightRect.y
			);

			const isBulletInRightTankTower = (
				bulletRect.x < tankRightEllipse.x + tankRightEllipse.radiusX &&
				bulletRect.x + bulletRect.width > tankRightEllipse.x - tankRightEllipse.radiusX &&
				bulletRect.y < tankRightEllipse.y + tankRightEllipse.radiusY &&
				bulletRect.y + bulletRect.height > tankRightEllipse.y - tankRightEllipse.radiusY
			);

			const isBulletInLeftTankRect = (
				bulletRect.x < tankLeftRect.x + tankLeftRect.width &&
				bulletRect.x + bulletRect.width > tankLeftRect.x &&
				bulletRect.y < tankLeftRect.y + tankLeftRect.height &&
				bulletRect.y + bulletRect.height > tankLeftRect.y
			);

			const isBulletInLeftTankTower = (
				bulletRect.x < tankLeftEllipse.x + tankLeftEllipse.radiusX &&
				bulletRect.x + bulletRect.width > tankLeftEllipse.x - tankLeftEllipse.radiusX &&
				bulletRect.y < tankLeftEllipse.y + tankLeftEllipse.radiusY &&
				bulletRect.y + bulletRect.height > tankLeftEllipse.y - tankLeftEllipse.radiusY
			);

			const isBulletInHill = hillShape.intersects({
				x,
				y,
			});
			if (isBulletInRightTankTower || isBulletInRightTankRect) {
				dispatch(setTankLeftWin(true))
			}
			if (isBulletInLeftTankTower || isBulletInLeftTankRect) {
				dispatch(setTankRightWin(true))
			}
			return isBulletInRightTankRect || isBulletInRightTankTower || isBulletInLeftTankRect || isBulletInLeftTankTower || isBulletInHill;
		};

		const hillShape = layerRef.current?.children.find(child => child.name() === "hillShape");

		if (checkCollision(newBulletX, newBulletY, hillShape, tankRightRect, tankRightEllipse, tankLeftRect, tankLeftEllipse)) {
			explosionSound.play()
			createExplosion(layerRef, newBulletX, newBulletY, "red")
			animationRef.current.stop();
			dispatch(setLeftBulletFired(false));
			dispatch(resetLeftBullet());
		} else if (
			newBulletY >= layerRef.current.height() ||
			newBulletX >= layerRef.current.width() ||
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
