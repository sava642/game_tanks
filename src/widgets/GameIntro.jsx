import React, { useState } from 'react';
import Modal from '../shared/Modal';
import Input from '../shared/Input';
import { setLeftTankName, selectLeftTank } from '../features/LeftTank';
import { setRightTankName, selectRightTank } from '../features/RightTank';
import { useSelector, useDispatch } from 'react-redux';

const GameIntro = ({ isScreenVisible, toggleLanguage, toggleRulesModal, handleStartButtonClick, isRulesModalOpen, t }) => {
	const dispatch = useDispatch();
	const nameLeftTank = useSelector(selectLeftTank).nameLeftTank;
	const nameRightTank = useSelector(selectRightTank).nameRightTank;
	const [isFirstNameModalOpen, setFirstNameModalOpen] = useState(false);
	const [isSecondNameModalOpen, setSecondNameModalOpen] = useState(false);


	const [firstNameError, setFirstNameError] = useState(false);
	const [secondNameError, setSecondNameError] = useState(false);

	const handleFirstNameChange = (event) => {
		dispatch(setLeftTankName(event.target.value));
		setFirstNameError(false); // Сброс ошибки при изменении имени
	};

	const handleSecondNameChange = (event) => {
		dispatch(setRightTankName(event.target.value));
		setSecondNameError(false); // Сброс ошибки при изменении имени
	};

	const handleFirstModal = () => {
		setFirstNameModalOpen(true);
	};

	const handleSecondModal = () => {
		if (!nameLeftTank) {
			setFirstNameError(true); // Показать ошибку, если имя не введено
		} else {
			setFirstNameModalOpen(false);
			setSecondNameModalOpen(true);
		}
	};

	const handleStartButtonClickInternal = () => {
		if (!nameRightTank) {
			setSecondNameError(true); // Показать ошибку, если имя не введено
		} else {
			handleStartButtonClick();
		}
	};

	const handleNameModalClose = () => {
		setFirstNameModalOpen(false);
		setSecondNameModalOpen(false);
	};
	return (
		<>
			{isScreenVisible && (
				<div>
					<img className="screensaver" src={process.env.PUBLIC_URL + '/main.png'} alt="Заставка" />
					<button className="btn-language" onClick={toggleLanguage}>{t('RU')}</button>
					<button className="btn-rules" onClick={toggleRulesModal}>{t('Game rules')}</button>
					<div className="centered-content">
						<p className="description">{t('Welcome to the exciting world of battle tanks! In this exciting two-game battle, you and a friend take on the role of tank commanders, ready to fight in an epic duel.')}</p>
						<button className="btn" onClick={handleFirstModal}>{t('Start game')}</button>
					</div>
					{isRulesModalOpen && (
						<Modal onClose={toggleRulesModal}>
							<div className='modal'>
								<p>{t("Your task is to accurately control the force and angle of fire to hit the enemy tank and defeat your opponent. The game has an obstacle for bullets in the form of a green hill in the middle of the screen. Your shots must skilfully circle around him to reach the target. Attention, strategy and precision remain the key in this exciting two-player game. Show your skills, develop tactics and become the undisputed champion.")}</p>
								<p>{t('Let\'s get started and may the best man win!')}</p>
								<span className="icon-modal-close" onClick={toggleRulesModal}>
									&times;
								</span>
							</div>
						</Modal>
					)}
					{isFirstNameModalOpen && (
						<Modal onClick={handleNameModalClose}>
							<div className='modal'>
								<p style={{ paddingBottom: '10px' }}>{t('Enter the first player\'s name')}</p>
								<Input
									type="text"
									value={nameLeftTank}
									onChange={handleFirstNameChange}
									placeholder={t('Enter name')}
									id="firstNameInput"
								/>
								{firstNameError && <p style={{ color: 'red' }}>{t('You did not enter a name')}</p>}
								<button className="btn" onClick={handleSecondModal}>{t('OK')}</button>
							</div>
						</Modal>
					)}
					{isSecondNameModalOpen && (
						<Modal onClick={handleNameModalClose}>
							<div className='modal'>
								<p style={{ paddingBottom: '10px' }}>{t('Enter the second player\'s name')}</p>
								<Input
									type="text"
									value={nameRightTank}
									onChange={handleSecondNameChange}
									placeholder={t('Enter name')}
									id="secondNameInput"
								/>
								{secondNameError && <p style={{ color: 'red' }}>{t('You did not enter a name')}</p>}
								<button className="btn" onClick={handleStartButtonClickInternal}>{t('OK')}</button>
							</div>
						</Modal>
					)}
				</div>
			)}
		</>
	);
};

export default GameIntro;