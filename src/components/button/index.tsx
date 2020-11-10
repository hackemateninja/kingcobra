// Definitions
import { IPlainObject } from '../../definitions/IPlainObject';

// Definitions
import { IButton } from '../../definitions/IButton';

// Styles
import { ButtonWrapper, ButtonSpan } from './style';

const Button: React.FC<IButton> = (props) => {
	return (
		<ButtonWrapper onClick={props.handlerClick}>
			<ButtonSpan>{props.children}</ButtonSpan>
		</ButtonWrapper>
	);
};

export default Button;