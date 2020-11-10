// Definitions
import { IPlainObject } from '../../definitions/IPlainObject';

// Styles
import { MainTitle } from './style';

const Title: React.FC<IPlainObject> = ( props ) => {
	return (
		<MainTitle>{props.children}</MainTitle>
	);
};

export default Title;