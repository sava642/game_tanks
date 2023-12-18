import React from 'react';

const Modal = ({ children, onClose }) => {
	const modalOverlayStyles = {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	};

	const modalContentStyles = {
		maxWidth: '80%',
		backgroundColor: 'white',
		padding: '20px',
		borderRadius: '8px',
		boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
	};



	return (
		<div style={modalOverlayStyles} onClick={onClose}>
			<div style={modalContentStyles} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default Modal;
