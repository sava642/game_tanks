import React from 'react';
import Input from '../../../shared/Input';
import { useSelector, useDispatch } from 'react-redux';
import { selectLeftTank, setLeftAngle } from '../../../features/LeftTank';
import { useTranslation } from 'react-i18next';

const InputAngleL = () => {
	const { t } = useTranslation()
	const angle = useSelector(selectLeftTank).angleLeft;
	const dispatch = useDispatch();

	const onAngleChange = (event) => {
		const newAngle = parseInt(event.target.value, 10);

		if (newAngle > 90 || newAngle < 0) return

		dispatch(setLeftAngle(newAngle));
	};

	return (
		<Input
			children={t("Enter angle ")}
			type="number"
			value={isNaN(angle) ? "" : angle}
			onChange={onAngleChange}
			min={0}
			max={90}
			id={"myInput"}
		/>
	);
};

export default InputAngleL;