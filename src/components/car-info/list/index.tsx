// Definitions
import { IPlainObject } from '@/def/IPlainObject';

// Styles
import { CarInfoListWrapper, CarInfoListItem, CarInfoListIcon, CarInfoListText } from './style';

const list = [{ title: 'No obligation to buy' }, { title: 'Your information is protected' }];

const CarInfoList: React.FC<IPlainObject> = (props) => {
  return (
    <CarInfoListWrapper device={props.device}>
      {list.map((item, index) => (
        <CarInfoListItem key={index}>
          <CarInfoListIcon>
            <use xlinkHref="#icon-check" />
          </CarInfoListIcon>
          <CarInfoListText blue>{item.title}</CarInfoListText>
        </CarInfoListItem>
      ))}
    </CarInfoListWrapper>
  );
};

export default CarInfoList;
