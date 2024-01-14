import React from 'react';

const Input = ({ children, type, value, onChange, min, max, id, placeholder }) => {
	return (
		<label htmlFor={id}>
			{children}
			<input
				type={type}
				value={value}
				onChange={onChange}
				min={min}
				max={max}
				id={id}
				placeholder={placeholder}
				style={{ height: "30px" }}
			/>
		</label>
	);
};

export default Input;