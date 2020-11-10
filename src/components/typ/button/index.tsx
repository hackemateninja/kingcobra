// Definitions
import { IPlainObject } from '../../../definitions/IPlainObject';

// Styles
import { ButtonWrapper } from './style';

const Button: React.FC<IPlainObject> = ( props ) => {
	return (
		<ButtonWrapper><span>{props.children}</span></ButtonWrapper>
	);
};

export default Button;