// Packages
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Definitios
import { IPlainObject } from '../../../definitions/IPlainObject';

// State
import { RootState } from '../../../../store/reducers';
import { setQuotes } from '../../../../store/slices/quotes';

// Components
import Row from '../../container/row';
import Column from '../../container/column';
import Display from '../../container/display';
import Quotes from '../../quotes';
import CarInfo from '../../car-info';
import CarInfoList from '../../car-info/list';
import StepBox from './box';
import CarInfoList from '../../car-info/list';

const StepTwo: React.FC<IPlainObject> = ( props ) => {
	const dispatch = useDispatch();
	const quotes = useSelector( ( state: RootState ) => state.quotesData );

	useEffect(() => {
		dispatch( setQuotes() );
	}, []);

	return (
		<Row>
			<Column sm={1} md={2}>
				<CarInfo />
				<Display hide="mobile">
					<Quotes items={quotes} />
				</Display>
			</Column>
			<Column sm={1} md={2}>
				<StepBox />
				<CarInfoList device="mobile" />
				<Display hide="desktop">
					<CarInfoList device="mobile" />
					<Quotes items={quotes} />
				</Display>
			</Column>
		</Row>
	);
};

export default StepTwo;