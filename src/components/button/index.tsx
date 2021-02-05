import { useSelector } from "react-redux";

// Definitions
import { IButton } from "@/def/IButton";
import { RootState } from "@/def/TRootReducer";

// Styles
import { ButtonWrapper, ButtonSpan } from "./style";
import Loader from "../loader";

const Button: React.FC<IButton> = (props) => {
  const loading = useSelector((state: RootState) => state.site.ui.buttonLoading);

  return (
    <ButtonWrapper onClick={props.handlerClick} {...props.type}>
      {loading === true ? <Loader type="button" /> : <ButtonSpan>{props.children}</ButtonSpan>}
    </ButtonWrapper>
  );
};

export default Button;
