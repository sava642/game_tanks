import Konva from 'konva';

export function createExplosion(layerRef, x, y, color) {
	if (!x || !y) {
		return;
	}

	const explosionCircle = new Konva.Circle({
		x: x,
		y: y,
		radius: 10,
		fill: color,
	});

	layerRef.current.add(explosionCircle);
	layerRef.current.batchDraw(); // Update the layer

	// Create the explosion animation
	const explosionAnimation = new Konva.Animation((frame) => {
		const scaleFactor = (frame.time / 100) * 2; // Coefficient for scaling
		const newRadius = 10 + scaleFactor; // Increase the radius

		// Update the radius of the explosion circle
		explosionCircle.radius(newRadius);
		layerRef.current.batchDraw(); // Update the layer

		if (newRadius >= 40) {
			// If the radius reaches the maximum value, stop the animation and remove the explosion
			explosionAnimation.stop();
			explosionCircle.destroy(); // Destroy the explosion circle
			layerRef.current.batchDraw(); // Update the layer
		}
	});

	explosionAnimation.start();
}

