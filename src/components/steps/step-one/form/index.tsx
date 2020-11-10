// Packages
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

// Definitions
import { IPlainObject } from '../../../../definitions/IPlainObject';

// Slices
import { saveMake, saveModel, saveZip } from "../../../../../store/slices/form"

// Components
import Box from '../../../box';
import Button from '../../../button';
import Input from '../../../form-elements/input';
import Select from '../../../form-elements/select';

// Test
let models = [{id: '2', value: 'corolla', name: 'Corolla', image: 'https://img.autobytel.com/2020/acura/mdx/2-550-threequartersview101-93697.JPG'}, {id: '4', value: 'other', name: 'Other', image: 'https://img.autobytel.com/2020/acura/mdx/2-550-threequartersview101-93697.JPG'}];

const FormOne: React.FC<IPlainObject> = ( props ) => {

	const dispatch = useDispatch();
	const [cue, setCue] = useState<string>( 'make' );
	const [error, setError] = useState<string>( '' );
	const [disabled, setDisabled] = useState<boolean>(false);
	const [formData, setFormData] = useState<object>(
		{ 'make': '', 'model': '', 'zip-code': ''}
	);

	const fields = [
		'make',
		'model',
		'zip-code'
	];

	// find next empty and update cue

	const updateInputs = ( doError: boolean ) => {
		for (var i = 0; i < fields.length; i++) {
			var current = fields[i];
			if(!formData[current]) {
				if(doError) { setError(current); }
				setCue(current);
				break;
			}
			if(doError) { setError(''); }
			setCue('');
		}
	}

	// save data to state

	const handlerMake = ( e: React.ChangeEvent<HTMLSelectElement> ) => {
		// reset error
		error === 'make'? setError('') : null;
		// update local state
		formData['make'] = e.target.value;
		setFormData(formData);
		// update store
		dispatch(saveMake(e.target.value))
		// find next empty input
		updateInputs( false );
	};

	const handlerModel = ( e: React.ChangeEvent<HTMLSelectElement> ) => {
		error === 'model'? setError('') : null;
		formData['model'] = e.target.value;
		setFormData(formData);
		dispatch(saveModel(e.target.value))
		updateInputs( false );
	};

	const checkZip = ( e: React.FocusEvent<HTMLInputElement> ) => {
		var zipCodePattern = /^\d{5}$|^\d{5}$/;
		if(zipCodePattern.test(e.target.value)) {
			dispatch(saveZip(e.target.value))
			formData['zip-code'] = e.target.value;
			setFormData(formData);
			setError('');
			updateInputs( false );
		} else {
			setError('zip-code');
		}
	};

	const handlerSubmit = ( e: React.MouseEvent<HTMLButtonElement> ) => {
		// check for empty inputs before submitting
		e.preventDefault();
		updateInputs( true );
	};

	return (
		<Box step="1" totalSteps="3" title="Choose Your Vehicle" subtitle="Select a Model and Enter Your Zip to Continue...">
			<Select
				id="make"
				value={props.make !== undefined ? props.make : ''}
				name="make"
				label="Make"
				cue={cue === "make"}
				error={error === "make"}
				message="Select a"
				options={props.makes}
				handlerChange={handlerMake}
			/>
			<Select
				id="model"
				value={props.model !== undefined ? props.model : ''}
				name="model"
				label="Model"
				cue={cue === "model"}
				error={error === "model"}
				message="Select a"
				options={models}
				handlerChange={handlerModel}
			/>
			<Input
				id="zip-code"
				value=""
				name="zip-code"
				label="Zip Code"
				cue={cue === "zip-code"}
				error={error === "zip-code"}
				type="tel"
				message="Enter a valid"
				length={5}
				// handlerChange={handlerZip}
				handlerBlur={checkZip}
			/>
			<Button isDisabled={disabled} handlerClick={handlerSubmit}>Check local prices</Button>
		</Box>
	);
};

export default FormOne;