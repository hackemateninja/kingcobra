// Packages
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Definitios
import { IPlainObject } from '../../../definitions/IPlainObject';

// Components
import HeroImage from '../../../components/hero-image';
import Row from '../../../components/container/row';
import Column from '../../../components/container/column';
import Display from '../../container/display';
import FormOne from './form';
import Advantages from '../../advantages';
import Quotes from '../../quotes';
import { RootState } from '../../../../store/reducers';
import { setQuotes } from '../../../../store/slices/quotes';

const StepOne: React.FC<IPlainObject> = ( props ) => {
	const dispatch = useDispatch();
	const quotes = useSelector((state: RootState) => state.quotesData);

	useEffect(() => {
		dispatch( setQuotes() );
	}, []);

	return (
		<Row>
			<Column sm={1} md={2}>
				<HeroImage />
				<Display hide="mobile">
					<Quotes items={quotes} />
				</Display>
			</Column>
			<Column sm={1} md={2}>
				<FormOne makes={props.makes} make={props.make} model={props.model} />
				<Advantages />
				<Display hide="desktop">
					<Quotes items={quotes} />
				</Display>
			</Column>
		</Row>
	);
};

export default StepOne;