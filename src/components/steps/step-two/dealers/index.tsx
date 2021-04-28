// Packages
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { RootState } from '@/def/TRootReducer';
import { IDealer } from '@/def/IDealers';

// Slices
import { setSelectedDealers } from '@/redux/slices/step-two';

// Components
import Box from '@/comp/box';
import Button from '@/comp/button';
import Dealers from '@/comp/dealers';
import Text from '@/comp/text';

declare const window: any;

const DealersBox: React.FC<IPlainObject> = (props) => {
  const dispatch = useDispatch();
  const dealersList = useSelector((state: RootState) => state.stepTwo.data.dealers);
  const dealersSelected = useSelector((state: RootState) => state.stepTwo.data.selectedDealers);
  const [error, setError] = useState<boolean>(false);
  const [cue, setCue] = useState<boolean>(true);
  const [dealers, setDealers] = useState({
    allChecked: false,
    list: [],
  });

  const oneDealerCheck = () => {
    if (dealersList.length === 1) {
      const list = dealersList.map((item: IDealer) => ({ ...item, isChecked: true }));
      setDealers({ allChecked: true, list });
      dispatch(setSelectedDealers(list));
    }
  };

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const elemID = e.target.id;
    const elemChecked = e.target.checked;
    let { allChecked, list } = dealers;

    if (elemID === 'all-dealers') {
      (allChecked = elemChecked), (list = list.map((item) => ({ ...item, isChecked: elemChecked })));
    } else {
      list = list.map((item: IDealer) =>
        `${item.id}-${item.dealerCode}` === elemID ? { ...item, isChecked: elemChecked } : item
      );
      allChecked = list.every((item) => item.isChecked);
    }

    const selectedDealers = list.filter((item) => item.isChecked);
    dispatch(setSelectedDealers(selectedDealers));
    setDealers({ allChecked, list });
    setError(false);
    setCue(selectedDealers.length !== 0 ? false : true);
  };

  const handlerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dealersSelected.length !== 0 ? props.handlerButton(e) : setError(true);
  };

  useEffect(() => {
    if (dealers.list.length != dealersList.length) {
      const allChecked = dealersList.every((item: IDealer) => item.isChecked);
      setDealers({
        ...dealers,
        list: dealersList.map((item: IDealer) => ({ ...item })),
        allChecked: allChecked,
      });
    }
  }, [dealersList]);

  useEffect(() => {
    oneDealerCheck();
    window.dataLayer && window.dataLayer.push({ event: 'dealer_impression' });
  }, [dealersList]);

  return (
    <Box
      step="2"
      totalSteps="3"
      title={dealers.list.length > 1 ? 'Choose Your Dealers' : 'We found this matching dealer!'}
      subtitle={dealers.list.length > 1 && 'Compare prices from multiple dealers'}
    >
      <Dealers
        cue={cue}
        items={dealers.list}
        allChecked={dealers.allChecked}
        error={error}
        handlerChange={handlerChange}
      />
      <Button handlerClick={handlerClick}>Continue</Button>
      <Text center={true} text="authorized">
        Let our <strong>trusted</strong> network get you the <strong>best</strong> deal.
      </Text>
    </Box>
  );
};

export default DealersBox;
