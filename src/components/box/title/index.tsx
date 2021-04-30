// Definitions
import { IPlainObject } from '@/def/IPlainObject';

// Styles
import { BoxTitleDesktop, BoxTitleMobile } from './style';

const Title: React.FC<IPlainObject> = (props) => {
  return (
    <>
      <BoxTitleDesktop>{props.children}</BoxTitleDesktop>
      <BoxTitleMobile>{props.children}</BoxTitleMobile>
    </>
  );
};

export default Title;
