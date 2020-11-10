// Definitions
import { IPlainObject } from '../../definitions/IPlainObject';

// Styles
import { SubTitleWrapper } from './style';

const SubTitle: React.FC<IPlainObject> = ( props ) => {
	return (
		<SubTitleWrapper>{props.children}</SubTitleWrapper>
	);
};

export default SubTitle;