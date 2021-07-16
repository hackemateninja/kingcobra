// Packages
import { useEffect, useState } from 'react';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { IDealer } from '@/def/IDealers';

// Components
import Box from '@/comp/box';
import Button from '@/comp/button';
import Dealers from '@/comp/dealers';
import Text from '@/comp/text';

declare const window: any;

const DealersBox: React.FC<IPlainObject> = (props) => {
  const { buttonText } = props;
  const [error, setError] = useState<boolean>(false);
  const [cue, setCue] = useState<boolean>(true);

  const [dealers, setDealers] = useState<IDealer[]>([]);
  const [allChecked, setAllChecked] = useState<boolean>(false);

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const elemID = e.target.id;
    const elemChecked = e.target.checked;
    let dealersUpdated = [];

    if (elemID === 'all-dealers') {
      setAllChecked(elemChecked);
      dealersUpdated = dealers.map((item) => ({ ...item, isChecked: elemChecked }));
    } else {
      dealersUpdated = dealers.map((item: IDealer) =>
        `${item.id}-${item.dealerCode}` === elemID ? { ...item, isChecked: elemChecked } : item
      );
      setAllChecked(dealersUpdated.every((item) => item.isChecked));
    }

    const selected = dealersUpdated.filter((item) => item.isChecked);

    setDealers(dealersUpdated);
    setError(false);
    setCue(selected.length === 0);
  };

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selected = dealers.filter((item) => item.isChecked);
    if (selected.length !== 0) {
      props.onButtonClick(e, selected);
    } else {
      setError(true);
    }
  };

  const handleOneDealer = () => {
    if (props.dealers.length === 1) {
      const list = props.dealers.map((item: IDealer) => ({ ...item, isChecked: true }));
      setAllChecked(true);
      setDealers(list);
    }
  };

  useEffect(() => {
    if (props.dealers.length) {
      const allChecked = props.dealers.every((item: IDealer) => item.isChecked);
      setDealers(props.dealers.map((item: IDealer) => ({ ...item })));
      setAllChecked(allChecked);
      handleOneDealer();
    }

    window.dataLayer && window.dataLayer.push({ event: 'dealer_impression' });
  }, [props.dealers]);

  return (
    <Box
      step="2"
      totalSteps="3"
      title={dealers.length > 1 ? 'Choose Your Dealers' : 'We found this matching dealer!'}
      subtitle={dealers.length > 1 && 'Compare prices from multiple dealers'}
    >
      <Dealers cue={cue} items={dealers} allChecked={allChecked} error={error} handlerChange={handlerChange} />
      {<Button handlerClick={onButtonClick}>{buttonText || 'Continue'}</Button>}
      <Text center={true} text="authorized">
        Let our <strong>trusted</strong> network get you the <strong>best</strong> deal.
      </Text>
    </Box>
  );
};

export default DealersBox;
