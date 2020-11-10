// Definitions
import { IPlainObject } from '../../../definitions/IPlainObject';

// Styles
import { BoxSubTitle } from './style';

const Title: React.FC<IPlainObject> = ( props ) => {
	return (
		<BoxSubTitle>{props.children}</BoxSubTitle>
	);
};

export default Title;