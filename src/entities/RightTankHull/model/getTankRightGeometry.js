export const tankLeftRectTankRightGeometry = (x, y, gunWidth, towerWidth, towerHeight, rectangleWidth, rectangleHeight) => {
	const tankRightRect = {
		x: x + gunWidth / 2 + 10 - rectangleWidth / 2,
		y: y + towerHeight / 2,
		width: rectangleWidth,
		height: rectangleHeight,
	};

	const tankRightEllipse = {
		x: x + gunWidth / 2 + 10,
		y: y + 2,
		radiusX: towerWidth / 2,
		radiusY: towerHeight / 2,
	};

	return { tankRightRect, tankRightEllipse };
};

