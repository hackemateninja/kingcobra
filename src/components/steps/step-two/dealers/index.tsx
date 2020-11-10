// Packages
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Definitions
import { IPlainObject } from '../../../../definitions/IPlainObject';
import { IDealer } from '../../../../definitions/IDealers';

// State
import { RootState } from '../../../../../store/reducers';

// Components
import Box from '../../../box';
import Button from '../../../button';
import Dealers from '../../../dealers';
import { setSelected } from '../../../../../store/slices/dealers';

const DealersBox: React.FC<IPlainObject> = ( props ) => {
	const dispatch = useDispatch();
	const dealersData = useSelector( ( state: RootState ) => state.dealersData );
	const [error, setError] = useState<boolean>( false );
	const [cue, setCue] = useState<boolean>( true );
	const [dealers, setDealers] = useState({ allChecked: false, list: dealersData.list.map( ( item: IDealer ) => ({ ...item, isChecked: false }) ) });

	const oneDealerCheck = () => {
		if ( dealersData.list.length === 1 ) {
			let { allChecked, list } = dealers;
			allChecked = true;
			list = list.map( ( item: IDealer ) => ({ ...item, isChecked: true }) );

			setDealers({ allChecked, list });
			dispatch( setSelected( list ) );
		}
	};

	const handlerChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
		const elemID = e.target.id;
		const elemChecked = e.target.checked;
		let { allChecked, list } = dealers;

		if ( elemID === 'all-dealers' ) {
			allChecked = elemChecked,
			list = list.map( ( item: IDealer ) => ({ ...item, isChecked: elemChecked }) )
		} else {
			list = list.map( ( item: IDealer ) =>
				item.id === elemID ? { ...item, isChecked: elemChecked } : item
			);
			allChecked = list.every( ( item: IDealer ) => item.isChecked );
		}

		const selectedDealers = list.filter( ( item: IDealer ) => item.isChecked );
		dispatch( setSelected( selectedDealers ) );
		setDealers({ allChecked, list });
		setError( false );
		setCue( selectedDealers.length !== 0 ? false : true );
	};

	const handlerClick = ( e: React.MouseEvent<HTMLButtonElement> ) => {
		dealersData.selected.length !== 0 ? props.handlerButton( e ) : setError( true );
	};

	useEffect(() => {
		oneDealerCheck();
	}, [])

	return (
		<Box step="2" totalSteps="3" title={dealers.list.length > 1 ? 'Choose Your Dealers' : 'We found this matching dealer!' } subtitle={dealers.list.length > 1 && 'Compare prices from multiple dealers'}>
			<Dealers cue={cue} items={dealers.list} allChecked={dealers.allChecked} error={error} handlerChange={handlerChange} />
			<Button isDisabled={false} handlerClick={handlerClick}>Continue</Button>
		</Box>
	);
};

export default DealersBox;