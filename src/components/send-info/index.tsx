// Packages
import { useState } from 'react';
import styled from 'styled-components';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';

const SendInfoWrapper = styled.div`
  display: none;
`;

const SendInfo: React.FC<IPlainObject> = (props) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    props.setSendInfo(false);
  };

  return (
    <SendInfoWrapper>
      <input id="send-info" type="checkbox" checked={checked} onChange={handlerChange} />
      <label htmlFor="send-info">Confirm send information</label>
    </SendInfoWrapper>
  );
};

export default SendInfo;
