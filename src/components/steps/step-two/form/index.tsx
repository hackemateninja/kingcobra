// Packages
import React, { useState } from 'react';

// Definitions
import { IPlainObject } from '../../../../definitions/IPlainObject';

// Components
import Box from '../../../box';
import Button from '../../../button';
import Input from '../../../form-elements/input';

// Styles
import { InputRow } from './style';

const FormTwo: React.FC<IPlainObject> = ( props ) => {
	const [cue, setCue] = useState<string>( 'first-name' );
	const [error, setError] = useState<string>( '' );

	return (
		<Box step="3" totalSteps="3" title="Complete Your Information">
			<InputRow>
				<Input
					id="first-name"
					value=""
					type="text"
					name="first-name"
					label="First Name"
					cue={cue === 'first-name'}
					error={false}
					message="Enter"
				/>
				<Input
					id="last-name"
					value=""
					type="text"
					name="last-name"
					label="Last Name"
					cue={cue === 'last-name'}
					error={false}
					message="Enter"
				/>
			</InputRow>
			<Input
				id="phone-number"
				value=""
				type="tel"
				name="phone-number"
				label="Phone Number"
				cue={cue === 'phone-number'}
				error={false}
				message="Enter a"
			/>
			<Input
				id="address"
				value=""
				type="text"
				name="address"
				label="Address"
				cue={cue === 'address'}
				error={false}
				message="Enter a"
				city="Miami FL 33133"
			/>
			<Input
				id="email"
				value=""
				type="email"
				name="email"
				label="Email Address"
				cue={cue === 'email'}
				error={false}
				message="Enter an"
			/>
			<Button>Get Pricing</Button>
		</Box>
	);
};

export default FormTwo;