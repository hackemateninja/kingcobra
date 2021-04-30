// Packages
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { RootState } from '@/def/TRootReducer';
import { IField } from '@/def/IField';

// Slices
import { setSelectedMake, setSelectedModel, setModels } from '@/redux/slices/step-one';
import { saveSourceId } from '@/redux/slices/step-two';
import { setButtonClick } from '@/redux/slices/thankyou';

// Styles
import {
  BottomContentWrapper,
  BottomTitle,
  BottomDescription,
  BottomRow,
  BottomCol,
  BottomFormTitle,
  BottomForm,
  BottomSide,
  BottomImg,
  BottomText,
  BottomLink,
} from './style';

// Components
import Container from '../container';
import Select from '../form-elements/select';
import Button from '../button';

import { config } from '@/util/config';

const BottomContent: React.FC<IPlainObject> = (props) => {
  const dispatch = useDispatch();
  const [cue, setCue] = useState<string>('make');
  const [error, setError] = useState<string>('');

  // Fill Models Select
  const models = useSelector((state: RootState) => state.stepOne.data.models);

  // form fields
  const make = props.make !== undefined ? props.make : '';
  const model = props.model !== undefined ? props.model : '';
  const zipcode = useSelector((state: RootState) => state.stepOne.data.zipcode.zip);
  const fields: IField[] = [
    {
      field: 'make',
      value: make,
      empty: make.length !== 0 ? false : true,
      error: false,
      success: make.length !== 0 ? true : false,
    },
    {
      field: 'model',
      value: model,
      empty: model.length !== 0 ? false : true,
      error: false,
      success: model.length !== 0 ? true : false,
    },
  ];

  const [formFields, setFormFields] = useState<IField[]>(fields);

  // find next empty and update cue
  const updateInputs = (doError: boolean) => {
    setError('');
    setCue('');
    for (let i = 0; i < formFields.length; i++) {
      const current = formFields[i]['field'];
      const empty = formFields[i]['empty'];
      const error = formFields[i]['error'];

      let next = '';
      i < 1 ? (next = formFields[i + 1]['field']) : (next = '');

      switch (true) {
        case empty:
          setCue(current);
          if (doError) {
            setError(current);
          }
          return;
        case error:
          setCue(current);
          setError(current);
          return;
        default:
          setCue(next);
      }
    }
  };

  const validateDropdown = (e: React.ChangeEvent<HTMLSelectElement>, inputIndex: number) => {
    // dispatch image loader

    // dispatch(dispatchFunction(e.target.value));
    const option = e.target.options[e.target.selectedIndex] as HTMLOptionElement;

    switch (true) {
      case inputIndex === 0:
        Object.assign(formFields[1], { empty: true, error: false, value: '' });
        if (e.target.value) {
          Object.assign(formFields[inputIndex], {
            empty: false,
            error: false,
            value: option.value,
          });
        } else {
          Object.assign(formFields[inputIndex], {
            empty: true,
            error: false,
            value: option.value,
          });
        }
        dispatch(setModels(e.target.value));
        break;
      case inputIndex === 1:
        if (e.target.value) {
          Object.assign(formFields[inputIndex], {
            empty: false,
            error: false,
            value: option.value,
          });
        } else {
          Object.assign(formFields[inputIndex], {
            empty: true,
            error: false,
            value: option,
          });
        }
        break;
    }
    setFormFields(formFields);
    updateInputs(false);
  };

  const handlerSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const [{ value: make }, { value: model }]: any = formFields;
    e.preventDefault();
    updateInputs(true);

    dispatch(saveSourceId(config.altSourceId));
    dispatch(setButtonClick(true));
    const errorInputs = formFields.filter((item) => item['empty'] || item['error']);

    if (errorInputs.length === 0) {
      dispatch(setSelectedMake(make));
      dispatch(setSelectedModel(model));
      props.onSubmit(e, make, model);
    }
  };

  useEffect(() => {
    updateInputs(false);
  }, []);

  return (
    <BottomContentWrapper>
      <Container>
        <BottomTitle>Keep the deals coming</BottomTitle>
        <BottomDescription>
          Either you have another car in mind or want to get more deals, we can help you out.
        </BottomDescription>
        <BottomRow>
          <BottomCol>
            <BottomFormTitle>Have another car model in mind? Get the closeout price quote too!</BottomFormTitle>
            <BottomForm>
              <Select
                id="make"
                value={make !== undefined ? make : ''}
                name="make"
                label="Make"
                cue={false}
                error={error === 'make'}
                message="Select a"
                options={props.makes}
                handlerChange={(e) => validateDropdown(e, 0)}
              />
              <Select
                id="model"
                value={model !== undefined ? model : ''}
                name="model"
                label="Model"
                cue={false}
                error={error === 'model'}
                message="Select a"
                options={models}
                handlerChange={(e) => validateDropdown(e, 1)}
              />
              <Button handlerClick={handlerSubmit}>Connect me to Dealers</Button>
            </BottomForm>
          </BottomCol>
          <BottomCol>
            <BottomSide>
              <BottomImg>
                <use xlinkHref="#abtl-logo" />
              </BottomImg>
              <BottomText>Research with one of our partners to get more deals on the table!</BottomText>
              <BottomLink href="https://www.autobytel.com" target="_blank">
                Click Here
              </BottomLink>
            </BottomSide>
          </BottomCol>
        </BottomRow>
      </Container>
    </BottomContentWrapper>
  );
};

export default BottomContent;
