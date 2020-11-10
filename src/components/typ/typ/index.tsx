// Packages
import React from 'react';

// Definitions
import { IPlainObject } from '../../../definitions/IPlainObject';

// Styles
import { TypWrapper } from './style';

const Typ: React.FC<IPlainObject> = (props) => {
	return (
		<TypWrapper>
			{props.children}
		</TypWrapper>
	);
};

export default Typ;