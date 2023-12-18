import Konva from 'konva';
import { createExplosion } from '../entities/createExplotion';
import { setRightBulletFired, setRightBulletX, setRightBulletY, resetRightBullet, setTankRightWin } from '../features/RightTank';
import { setTankLeftWin } from '../features/LeftTank';


export const fireAndAnimateBulletRight = (dispatch, layerRef, animationRef, angle, power, bulletX, bulletY, tankRightRect, tankRightEllipse, tankLeftRect, tankLeftEllipse) => {
	const explosionSound = new Audio('./explosion.mp3');
	const shootSound = new Audio('./shoot.mp3');
	shootSound.play()
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
		const newBulletX = bulletX - speedX * time;  // изменение здесь
		const newBulletY = bulletY - speedY * time + (1 / 2) * gravity * time * time;

		const checkCollision = (x, y, hillShape, tankRightRect, tankRightEllipse, tankLeftRect, tankLeftEllipse) => {
			// Формируем прямоугольник для пули
			const bulletRect = {
				x,
				y,
				width: 1, // Ширина пули (можете уточнить размер)
				height: 1, // Высота пули (можете уточнить размер)
			};

			// Проверяем столкновение с прямоугольником правого танка
			const isBulletInRightTankRect = (
				bulletRect.x < tankRightRect.x + tankRightRect.width &&
				bulletRect.x + bulletRect.width > tankRightRect.x &&
				bulletRect.y < tankRightRect.y + tankRightRect.height &&
				bulletRect.y + bulletRect.height > tankRightRect.y
			);

			// Проверяем столкновение с башней правого танка
			const isBulletInRightTankTower = (
				bulletRect.x < tankRightEllipse.x + tankRightEllipse.radiusX &&
				bulletRect.x + bulletRect.width > tankRightEllipse.x - tankRightEllipse.radiusX &&
				bulletRect.y < tankRightEllipse.y + tankRightEllipse.radiusY &&
				bulletRect.y + bulletRect.height > tankRightEllipse.y - tankRightEllipse.radiusY
			);

			// Проверяем столкновение с прямоугольником левого танка
			const isBulletInLeftTankRect = (
				bulletRect.x < tankLeftRect.x + tankLeftRect.width &&
				bulletRect.x + bulletRect.width > tankLeftRect.x &&
				bulletRect.y < tankLeftRect.y + tankLeftRect.height &&
				bulletRect.y + bulletRect.height > tankLeftRect.y
			);

			// Проверяем столкновение с башней левого танка
			const isBulletInLeftTankTower = (
				bulletRect.x < tankLeftEllipse.x + tankLeftEllipse.radiusX &&
				bulletRect.x + bulletRect.width > tankLeftEllipse.x - tankLeftEllipse.radiusX &&
				bulletRect.y < tankLeftEllipse.y + tankLeftEllipse.radiusY &&
				bulletRect.y + bulletRect.height > tankLeftEllipse.y - tankLeftEllipse.radiusY
			);

			// Проверяем столкновение с холмом
			const isBulletInHill = hillShape.intersects({
				x,
				y,
			});
			if (isBulletInLeftTankTower || isBulletInLeftTankRect) {
				dispatch(setTankRightWin(true))
			}
			if (isBulletInRightTankTower || isBulletInRightTankRect) {
				dispatch(setTankLeftWin(true))
			}
			// Возвращаем true, если есть столкновение с любым танком или холмом
			return isBulletInRightTankRect || isBulletInRightTankTower || isBulletInLeftTankRect || isBulletInLeftTankTower || isBulletInHill;
		};

		const hillShape = layerRef.current?.children.find(child => child.name() === "hillShape");

		if (checkCollision(newBulletX, newBulletY, hillShape, tankRightRect, tankRightEllipse, tankLeftRect, tankLeftEllipse)) {
			explosionSound.play()
			console.log('Столкновение');
			createExplosion(layerRef, newBulletX, newBulletY, "orange")
			animationRef.current.stop();
			dispatch(setRightBulletFired(false));
			dispatch(resetRightBullet());
		} else if (
			newBulletY >= layerRef.current.height() ||
			newBulletX <= 0  // изменение здесь
		) {
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
