import React from 'react';

const Button = ({ children, onClick, id }) => {
	return (
		<button type="button" onClick={onClick} id={id}>
			{children}
		</button>
	);
};

export default Button;