import React from 'react';
import Modal from '../../../shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectLeftTank, setTankLeftWin } from '../../../features/LeftTank';
import { selectRightTank, setTankRightWin } from '../../../features/RightTank';
import { useTranslation } from 'react-i18next';


const TankThatWonModal = () => {
	const { t } = useTranslation()
	const { tankLeftWin, nameLeftTank } = useSelector(selectLeftTank)
	const { tankRightWin, nameRightTank } = useSelector(selectRightTank)
	const dispatch = useDispatch()
	const formattedNameLeftTank = nameLeftTank ? nameLeftTank.charAt(0).toUpperCase() + nameLeftTank.slice(1) : '';
	const formattedNameRightTank = nameRightTank ? nameRightTank.charAt(0).toUpperCase() + nameRightTank.slice(1) : '';

	const handleCloseModal = () => {
		dispatch(setTankLeftWin(false));
		dispatch(setTankRightWin(false));
		window.location.reload();
	};

	return (
		<div>
			{tankLeftWin && (
				<Modal onClose={handleCloseModal}>
					<div className="modal-info">
						<p>{formattedNameLeftTank} {t("wins")}</p>
						<button className="btn-try-again" onClick={handleCloseModal}
						>{t("Try again")}</button>
					</div>
				</Modal>
			)}
			{tankRightWin && (
				<Modal onClose={handleCloseModal}>
					<div className="modal-info">
						<p>{formattedNameRightTank} {t("wins")}</p>
						<button className="btn-try-again" onClick={handleCloseModal}
						>{t("Try again")}</button>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default TankThatWonModal;
