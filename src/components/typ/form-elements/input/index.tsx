// Packages
import React, { useState } from 'react';

// Definitions
import { IInput } from '../../../../definitions/IInput';

// Components
import Cue from '../cue';

// Styles
import {
	FormElement,
	FormElementLabel,
	FormElementIcon,
	FormElementMessage,
	Element
} from '../style';

const Input: React.FC<IInput> = ( props ) => {
	const [focus, setFocus] = useState<boolean>( false );
	const [empty, setEmpty] = useState<boolean>( props.value.length !== 0 ? false : true );

	const handlerFocus = ( e: React.FocusEvent<HTMLInputElement> ) => {
		props.handlerFocus !== undefined && props.handlerFocus( e );
		setFocus( true );
	};
	const handlerBlur = ( e: React.FocusEvent<HTMLInputElement> ) => {
		e.target.value.length !== 0 ? setEmpty( false ) : setEmpty( true );
		props.handlerBlur !== undefined && props.handlerBlur( e );
		setFocus( false );
	};
	const handlerChange = ( e: React.ChangeEvent<HTMLInputElement> ) => props.handlerChange !== undefined && props.handlerChange( e );

	return (
		<FormElement active={focus || !empty} cue={props.cue} error={props.error}>
			<Element
				id={props.id}
				defaultValue={props.value}
				type={props.type}
				name={props.name}
				onFocus={handlerFocus}
				onBlur={handlerBlur}
				onChange={handlerChange}
				icon={props.icon != undefined}
			/>
			<FormElementLabel
				htmlFor={props.id}
				active={focus || !empty}
				icon={props.icon !== undefined}
			>{props.label}</FormElementLabel>
			{props.icon !== undefined &&
				<FormElementIcon active={focus || !empty}>
					<use xlinkHref={props.icon} />
				</FormElementIcon>
			}
			{props.cue && <Cue />}
			{props.error &&
				<FormElementMessage>{props.message} {props.label}</FormElementMessage>
			}
		</FormElement>
	);
};

export default Input;