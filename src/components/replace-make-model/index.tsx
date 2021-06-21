// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import Parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import { RootState } from '@/def/TRootReducer';

const ReplaceMakeModel: React.FC<IPlainObject> = ({ text }) => {
  const stepOne = useSelector((state: RootState) => state.stepOne.data);
  const stateMake = stepOne.selectedMake.name ? stepOne.selectedMake.name : '';
  const stateModel = stepOne.selectedModel.name ? stepOne.selectedModel.name : '';

  return (
    <>
      {Parse(
        text
          .replaceAll('[make]', stateMake)
          .replaceAll('[MAKE]', stateMake)
          .replaceAll('[model]', stateModel)
          .replaceAll('[MODEL]', stateModel)
      )}
    </>
  );
};

export default ReplaceMakeModel;
