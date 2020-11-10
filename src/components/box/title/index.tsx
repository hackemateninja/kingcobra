// Definitions
import { IPlainObject } from '../../../definitions/IPlainObject';

// Styles
import { BoxTitle } from './style';

const Title: React.FC<IPlainObject> = ( props ) => {
	return (
		<BoxTitle>{props.children}</BoxTitle>
	);
};

export default Title;