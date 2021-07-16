// Definitios
import { IPlainObject } from '@/def/IPlainObject';

// Components
import Row from '@/comp/container/row';
import Column from '@/comp/container/column';
import Display from '@/comp/container/display';
import Quotes from '@/comp/quotes';
import CarInfo from '@/comp/car-info';
import CarInfoList from '@/comp/car-info/list';
import StepBox from '@/comp/steps/step-two/box';

const StepTwo: React.FC<IPlainObject> = (props) => {
  const { quotes, dealers, campaignImage, model, zipCodeInfo, onSubmit, buttonText, onStepChange } = props;

  return (
    <Row>
      <Column sm={1} md={2}>
        <CarInfo campaignImage={campaignImage} model={model} />
        <Display hide="mobile">
          <Quotes items={quotes} />
        </Display>
      </Column>
      <Column sm={1} md={2}>
        <StepBox
          dealers={dealers}
          zipCodeInfo={zipCodeInfo}
          onSubmit={onSubmit}
          buttonText={buttonText}
          onStepChange={onStepChange}
        />
        <CarInfoList device="mobile" />
        <Display hide="desktop">
          <Quotes items={quotes} />
        </Display>
      </Column>
    </Row>
  );
};

export default StepTwo;
