// Definitions
import { IButton } from '@/def/IButton';

// Styles
import { ButtonWrapper, ButtonSpan } from './style';
import Loader from '../loader';

const Button: React.FC<IButton> = (props) => {
  return (
    <ButtonWrapper onClick={props.handlerClick} disabled={props.disabled} {...props.type}>
      {props.loading ? <Loader type="button" /> : <ButtonSpan>{props.children}</ButtonSpan>}
    </ButtonWrapper>
  );
};

export default Button;
