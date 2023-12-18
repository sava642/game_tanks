import React from 'react';
import Input from '../../../shared/Input';
import { useSelector, useDispatch } from 'react-redux';
import { selectLeftTank } from '../../../features/LeftTank';
import { setLeftPower } from '../../../features/LeftTank';
import { useTranslation } from 'react-i18next';

const InputPowerL = () => {
	const { t } = useTranslation()
	const minValue = 0;
	const maxValue = 1000;

	const power = useSelector(selectLeftTank).powerLeft;
	const dispatch = useDispatch();

	const onPowerChange = (event) => {
		let power = parseInt((event.target.value), 10);
		if (power < minValue) {
			power = minValue;
		} else if (power > maxValue) {
			power = maxValue;
		}

		dispatch(setLeftPower(power));
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

export default InputPowerL;