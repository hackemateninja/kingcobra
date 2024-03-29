// Definitions
import { IPlainObject } from '@/def/IPlainObject';

// Components
import CarInfoList from './list';

// Styles
import { CarInfoWrapper, CarInfoImage, CarInfoContent, CarInfoText } from './style';

const CarInfo: React.FC<IPlainObject> = (props) => {
  const { model } = props;
  const image = props.campaignImage || model.mediumJpg;
  const numberWithCommas = (number: number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <CarInfoWrapper>
      <CarInfoImage src={image} alt={model.name} />
      <CarInfoContent>
        <CarInfoText green>Base MSRP. ${model.msrpMin}</CarInfoText>
        <CarInfoText>
          Fill out the form to find <strong>offers</strong> from your <strong>preferred</strong> dealers!
        </CarInfoText>
        <CarInfoList device="desktop" />
      </CarInfoContent>
    </CarInfoWrapper>
  );
};

export default CarInfo;
