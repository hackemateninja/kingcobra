// Packages
import { useEffect, useState } from 'react';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { IField } from '@/def/IField';
import { IModel } from '@/def/IModel';

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

// Services
import { getModelsByMake as getModelsByMakeService } from '@/src/services';

const BottomContent: React.FC<IPlainObject> = (props) => {
  const [cue, setCue] = useState<string>('make');
  const [error, setError] = useState<string>('');
  const [models, setModels] = useState<IModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Form fields
  const make = props.make !== undefined ? props.make : '';
  const model = props.model !== undefined ? props.model : '';

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

  // Find next empty and update cue
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

  const getModelsByMake = async (makeName: string) => {
    if (makeName !== '') {
      const models: IModel[] = await getModelsByMakeService(makeName);
      setModels(models);
    } else {
      setModels([]);
    }
  };

  const validateDropdown = (e: React.ChangeEvent<HTMLSelectElement>, inputIndex: number) => {
    const value = e.target.value;
    const newFormFields = [...formFields];
    const formFieldMake = { ...newFormFields[0] };
    const formFieldModel = { ...newFormFields[1] };

    switch (true) {
      case inputIndex === 0:
        if (value) {
          Object.assign(formFieldMake, { empty: false, error: false, value: value });
        } else {
          Object.assign(formFieldMake, { empty: true, error: false, value: value });
        }

        Object.assign(formFieldModel, { empty: true, error: false, value: '' });

        newFormFields[0] = formFieldMake;
        newFormFields[1] = formFieldModel;
        setModels([]);
        getModelsByMake(value);
        break;
      case inputIndex === 1:
        if (value) {
          Object.assign(formFieldModel, { empty: false, error: false, value: value });
        } else {
          Object.assign(formFieldModel, { empty: true, error: false, value: value });
        }
        newFormFields[1] = formFieldModel;
        break;
    }
    setFormFields(newFormFields);
  };

  const handlerSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const [{ value: make }, { value: model }]: any = formFields;
    e.preventDefault();
    updateInputs(true);
    setIsLoading(true);

    const errorInputs = formFields.filter((item) => item['empty'] || item['error']);

    if (errorInputs.length === 0) {
      const makeData = props.makes.find((item) => item.seoName === make);
      const modelData = models.find((item) => item.seoName === model);
      props.onSubmit(e, makeData, modelData);
    }
  };

  useEffect(() => {
    updateInputs(false);
  }, [formFields]);

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
                initialValue={make !== undefined ? make : ''}
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
                initialValue={model !== undefined ? model : ''}
                name="model"
                label="Model"
                cue={false}
                error={error === 'model'}
                message="Select a"
                options={models}
                handlerChange={(e) => validateDropdown(e, 1)}
              />
              <Button handlerClick={handlerSubmit} loading={isLoading}>
                Connect me to Dealers
              </Button>
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
