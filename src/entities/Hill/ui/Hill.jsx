import { useEffect, useRef } from 'react';
import Konva from 'konva';

function Hill({ layerRef, randomDistanceRight, randomDistanceLeft }) {

	const hillShapeRef = useRef(null);
	const height = window.innerHeight;
	const width = window.innerWidth;

	useEffect(() => {
		function tankLeftRectRandomHeightPercentage() {
			return Math.floor(Math.random() * (90 - 85 + 1)) + 85;
		}
		const randomHeightPercentage = tankLeftRectRandomHeightPercentage();
		const createHillShape = () => {
			const hillShape = new Konva.Shape({
				name: 'hillShape',
				sceneFunc: (context, shape) => {
					const hillHeight = (height * randomHeightPercentage) / 100;
					context.beginPath();
					context.moveTo(randomDistanceLeft, height - 16);
					context.quadraticCurveTo(
						width / 2,
						height / 2 - hillHeight - 16,
						width - randomDistanceRight,
						height - 16
					);
					context.fillStyle = 'green';
					context.fill();
				},
			});

			hillShapeRef.current = hillShape;
			layerRef.current.add(hillShape);
		};

		createHillShape();
	}, [height, layerRef, width]);

	return null;
}

export default Hill;


