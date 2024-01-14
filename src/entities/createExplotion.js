import Konva from 'konva';

export function createExplosion(layerRef, x, y, color) {
	if (!x || !y || !layerRef.current) {
		return;
	}
	const explosionCircle = new Konva.Circle({
		x: x,
		y: y,
		radius: 10,
		fill: color,
	});
	layerRef.current.add(explosionCircle);
	layerRef.current.batchDraw();
	const explosionAnimation = new Konva.Animation((frame) => {
		const scaleFactor = (frame.time / 100) * 2;
		const newRadius = 10 + scaleFactor;
		explosionCircle.radius(newRadius);
		layerRef.current.batchDraw();
		if (newRadius >= 40) {
			explosionAnimation.stop();
			explosionCircle.destroy();
			layerRef.current.batchDraw();
		}
	});
	explosionAnimation.start();
};


