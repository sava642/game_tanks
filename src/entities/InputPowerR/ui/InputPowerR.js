import React from 'react';
import Input from '../../../shared/Input';
import { useSelector, useDispatch } from 'react-redux';
import { selectRightTank } from '../../../features/RightTank';
import { setRightPower } from '../../../features/RightTank';
import { useTranslation } from 'react-i18next';

const InputPowerR = () => {
	const { t } = useTranslation()
	const minValue = 0;
	const maxValue = 1000;
	const power = useSelector(selectRightTank).powerRight;
	const dispatch = useDispatch();

	const onPowerChange = (event) => {
		let power = parseInt((event.target.value), 10);
		if (power < minValue) {
			power = minValue;
		} else if (power > maxValue) {
			power = maxValue;
		}

		dispatch(setRightPower(power));
	};

	return (
		<Input
			children={t("Enter power ")}
			type="number"
			value={isNaN(power) ? "" : power}
			onChange={onPowerChange}
			min={minValue}
			max={maxValue}
			id={"myInputPower"}
		/>
	);
};

export default InputPowerR;