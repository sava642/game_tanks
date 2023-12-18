import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const MyImage = ({ src, x, y, w, h }) => {
	const [image] = useImage(src);

	return <Image
		x={x} // Положение по горизонтали для левого танка
		y={y} // Положение по вертикали
		width={w} // Ширина изображения танка
		height={h}
		image={image} />;
};

export default MyImage;