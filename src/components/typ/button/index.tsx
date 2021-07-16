// Definitions
import { IButton } from '@/def/IButton';

// Components
import Loader from '@/comp/loader';

// Styles
import { ButtonWrapper, ButtonSpan } from './style';

const Button: React.FC<IButton> = (props) => {
  return (
    <ButtonWrapper onClick={props.handlerClick}>
      {props.loading ? <Loader type="button" /> : <ButtonSpan>{props.children}</ButtonSpan>}
    </ButtonWrapper>
  );
};

export default Button;
