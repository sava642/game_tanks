import Konva from 'konva';

export function createExplosion(layerRef, x, y, color) {
	if (!x || !y || !layerRef.current) {
		return;
	}

	// Create the explosion circle
	const explosionCircle = new Konva.Circle({
		x: x,
		y: y,
		radius: 10,
		fill: color,
	});

	// Add the explosion circle to the layer
	layerRef.current.add(explosionCircle);
	// Update the layer
	layerRef.current.batchDraw();

	// Create the explosion animation
	const explosionAnimation = new Konva.Animation((frame) => {
		const scaleFactor = (frame.time / 100) * 2; // Coefficient for scaling
		const newRadius = 10 + scaleFactor; // Increase the radius

		// Update the radius of the explosion circle
		explosionCircle.radius(newRadius);
		// Update the layer
		layerRef.current.batchDraw();

		if (newRadius >= 40) {
			// If the radius reaches the maximum value, stop the animation and remove the explosion
			explosionAnimation.stop();
			// Destroy the explosion circle
			explosionCircle.destroy();
			// Update the layer
			layerRef.current.batchDraw();
		}
	});

	// Start the explosion animation
	explosionAnimation.start();
}


