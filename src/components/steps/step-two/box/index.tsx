// Packages
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { IDealer } from '@/def/IDealers';

// Components
import FormTwo from '../form';
import DealersBox from '../dealers';

// Styles
import { StepBoxWrapper } from './style';

const StepBox: React.FC<IPlainObject> = (props) => {
  const { zipCodeInfo, dealers, buttonText, onStepChange, onSubmit } = props;

  const [boxActive, setBoxActive] = useState('dealers');
  const [selectedDealers, setSelectedDealers] = useState<IDealer[]>([]);
  const oneDealer: boolean = dealers.length === 1;

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>, selectedDealers) => {
    setSelectedDealers(selectedDealers);
    setBoxActive('form');
    onStepChange();
  };

  return (
    <StepBoxWrapper one={oneDealer} active={boxActive}>
      {dealers.length > 1 ? (
        <>
          <CSSTransition unmountOnExit in={boxActive === 'dealers'} timeout={300} classNames="s2-dealers">
            <div className="s2-dealers">
              <DealersBox buttonText={buttonText} onButtonClick={onButtonClick} dealers={dealers} />
            </div>
          </CSSTransition>
          <CSSTransition unmountOnExit in={boxActive === 'form'} timeout={300} classNames="s2-form">
            <div className="s2-form">
              <FormTwo
                selectedDealers={selectedDealers}
                zipCodeInfo={zipCodeInfo}
                onSubmit={onSubmit}
                buttonText={buttonText}
              />
            </div>
          </CSSTransition>
        </>
      ) : (
        <>
          <DealersBox buttonText={buttonText} onButtonClick={onButtonClick} dealers={dealers} />
          <FormTwo
            selectedDealers={selectedDealers}
            zipCodeInfo={zipCodeInfo}
            onSubmit={onSubmit}
            buttonText={buttonText}
          />
        </>
      )}
    </StepBoxWrapper>
  );
};

export default StepBox;
