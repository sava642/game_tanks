import React from 'react';
import Input from '../../../shared/Input';
import { useSelector, useDispatch } from 'react-redux';
import { selectRightTank, setRightAngle } from '../../../features/RightTank';
import { useTranslation } from 'react-i18next';

const InputAngleR = () => {
	const { t } = useTranslation()
	const angle = useSelector(selectRightTank).angleRight;
	const dispatch = useDispatch();

	const onAngleChange = (event) => {
		const newAngle = parseInt(event.target.value, 10);
		if (newAngle > 90 || newAngle < 0) return
		dispatch(setRightAngle(newAngle));
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

export default InputAngleR;