// Packages
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// Slice
import { saveSendInfo } from "@/redux/slices/step-two";

const SendInfoWrapper = styled.div`
  display: none;
`;

const SendInfo: React.FC = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState<boolean>(false);

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    dispatch(saveSendInfo(false));
  };

  return (
    <SendInfoWrapper>
      <input id="send-info" type="checkbox" checked={checked} onChange={handlerChange} />
      <label htmlFor="send-info">Confirm send information</label>
    </SendInfoWrapper>
  );
};

export default SendInfo;
