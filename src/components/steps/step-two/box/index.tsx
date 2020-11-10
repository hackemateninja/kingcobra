// Packages
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

// State
import { RootState } from '../../../../../store/reducers';

// Definitions
import { IPlainObject } from '../../../../definitions/IPlainObject';

// Components
import FormTwo from '../form';
import DealersBox from '../dealers';

// Styles
import { StepBoxWrapper } from './style';

const StepBox: React.FC<IPlainObject> = ( props ) => {
	const [activeBox, setActiveBox] = useState<string>( 'dealers' );
	const dealers = useSelector( ( state: RootState ) => state.dealersData );

	const handlerClick = ( e: React.MouseEvent<HTMLButtonElement> ) => setActiveBox( 'form' );

	return (
		<StepBoxWrapper one={dealers.list.length === 1} active={activeBox}>
			{dealers.list.length > 1 ? (
				<>
					<CSSTransition unmountOnExit in={activeBox === 'dealers'} timeout={300} classNames="s2-dealers">
						<div className="s2-dealers">
							<DealersBox handlerButton={handlerClick} />
						</div>
					</CSSTransition>
					<CSSTransition unmountOnExit in={activeBox === 'form'} timeout={300} classNames="s2-form">
						<div className="s2-form">
							<FormTwo />
						</div>
					</CSSTransition>
				</>
			) : (
				<>
					<DealersBox handlerButton={handlerClick} />
					<FormTwo />
				</>
			)}
		</StepBoxWrapper>
	);
};

export default StepBox;