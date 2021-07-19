// Packages
import { useEffect, useState } from 'react';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { IModel } from '@/def/IModel';
import { IZipCode } from '@/def/IZipCode';

// Components
import Box from '@/comp/box';
import Button from '@/comp/button';
import Input from '@/comp/form-elements/input';
import Select from '@/comp/form-elements/select';

// Context
import { useAppContext } from '@/ctx/app-context';

// Services
import { getModelsByMake as getModelsByMakeService, getZipCodeInfo as getZipCodeInfoService } from '@/src/services';

const FormOne: React.FC<IPlainObject> = (props) => {
  const { buttonText, makes, isCampaign, campaign } = props;

  const {
    state: { selectedMake, selectedModel },
    setSelectedMake,
    setSelectedModel,
  } = useAppContext();

  const [cue, setCue] = useState<string>('make');
  const [error, setError] = useState<string>('');
  const [models, setModels] = useState<IModel[]>(props.models || []);
  const [zipCodeInfo, setZipCodeInfo] = useState<IZipCode>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const preSelectedMakeName: string = props.preSelectedMake !== undefined ? props.preSelectedMake.seoName : '';
  const preSelectedModelName: string = props.preSelectedModel !== undefined ? props.preSelectedModel.seoName : '';

  const fields = [
    {
      field: 'make',
      value: preSelectedMakeName,
      empty: preSelectedMakeName.length !== 0 ? false : true,
      error: false,
      success: preSelectedMakeName.length !== 0 ? true : false,
    },
    {
      field: 'model',
      value: preSelectedModelName,
      empty: preSelectedModelName.length !== 0 ? false : true,
      error: false,
      success: preSelectedModelName.length !== 0 ? true : false,
    },
    { field: 'zip-code', value: '', empty: true, error: false, success: false },
  ];

  const [formFields, setFormFields] = useState<object[]>(fields);

  useEffect(() => {
    if (props.preSelectedMake) setSelectedMake(props.preSelectedMake);
    if (props.preSelectedModel) setSelectedModel(props.preSelectedModel);
  }, []);

  // Find next empty and update cue
  const updateInputs = (doError: boolean) => {
    setError('');
    setCue('');

    for (let i = 0; i < formFields.length; i++) {
      const current = formFields[i]['field'];
      const empty = formFields[i]['empty'];
      const formFieldError = formFields[i]['error'];

      let next = '';
      i < 2 ? (next = formFields[i + 1]['field']) : (next = '');

      switch (true) {
        case empty:
          setCue(current);
          if (doError) {
            setError(current);
          }
          return;
        case formFieldError:
          setCue(current);
          setError(current);
          return;
        default:
          setCue(next);
      }
    }
  };

  const handleMakeChange = (makeName: string) => {
    const make = makes.filter((make) => make.seoName === makeName);
    setSelectedMake(make.length !== 0 ? make[0] : {});
    setSelectedModel({});
  };

  const handleModelChange = (modelName: string) => {
    const model = models.filter((model) => model.seoName === modelName);
    setSelectedModel(model.length !== 0 ? model[0] : {});
  };

  const getModelsByMake = async (makeName: string) => {
    if (makeName !== '') {
      if (isCampaign){
        const data = await fetch(`/api/campaing?make=${makeName}&bodyType=${campaign}`)
        const {models} = await data.json();
        setModels(models);
      }else{
        const models: IModel[] = await getModelsByMakeService(makeName);
        setModels(models);
      }
    } else {
      setModels([]);
    }
  };

  const getZipCodeInfo = async (zipCode: string) => {
    setIsLoading(true);
    let zipCodeData = await getZipCodeInfoService(zipCode);

    if (zipCodeData.length !== 0 && zipCodeData[0]['status'] === undefined) {
      zipCodeData = zipCodeData[0].zipcodes[0];
      setZipCodeInfo({
        city: zipCodeData.default_city,
        state: zipCodeData.state_abbreviation,
        zip: zipCodeData.zipcode,
      });
    } else {
      setZipCodeInfo({});
    }
    setIsLoading(false);
  };

  const validateDropdown = (e: React.ChangeEvent<HTMLSelectElement>, inputIndex: number, changeHandler: Function) => {
    const value = e.target.value;
    const newFormFields = [...formFields];
    const formFieldMake = { ...newFormFields[0] };
    const formFieldModel = { ...newFormFields[1] };

    changeHandler(value);

    switch (true) {
      case inputIndex === 0:
        if (value) {
          Object.assign(formFieldMake, { empty: false, error: false, value });
        } else {
          Object.assign(formFieldMake, { empty: true, error: false, value });
        }

        Object.assign(formFieldModel, { empty: true, error: false, value: '' });

        newFormFields[inputIndex] = formFieldMake;
        newFormFields[1] = formFieldModel;
        setModels([]);
        getModelsByMake(value);
        break;
      case inputIndex === 1:
        if (value) {
          Object.assign(formFieldModel, { empty: false, error: false, value });
        } else {
          Object.assign(formFieldModel, { empty: true, error: false, value });
        }
        newFormFields[inputIndex] = formFieldModel;
        break;
    }
    setFormFields(newFormFields);
  };

  const setZipCode = (value: string) => {
    const zipRegex = /^\d{5}$|^\d{5}$/;
    const newFormFields = [...formFields];
    const formField = { ...newFormFields[2] };

    if (zipRegex.test(value)) {
      Object.assign(formField, { empty: false, value: value });
    } else {
      setZipCodeInfo({});
      Object.assign(formField, { empty: true, error: false, success: false, value: '' });
    }

    newFormFields[2] = formField;
    setFormFields(newFormFields);
  };

  const handlerZipBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setZipCode(e.target.value);
  };

  const validateZipCode = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const zipRegex = /^\d{5}$|^\d{5}$/;
    const value = e.target.value;

    setZipCode(value);
    if (zipRegex.test(value)) getZipCodeInfo(value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    updateInputs(true);

    const errorInputs = formFields.filter((item) => item['empty'] || item['error']);

    if (errorInputs.length === 0 && props.onSubmit !== undefined) {
      await props.onSubmit(e, selectedMake, selectedModel, zipCodeInfo);
    }
  };

  // Ctrl + R on Firefox when the input is not empty
  const valueFromReload = (value: string) => {
    const zipRegex = /^\d{5}$|^\d{5}$/;

    setZipCode(value);
    if (zipRegex.test(value)) getZipCodeInfo(value);
  };

  useEffect(() => {
    updateInputs(false);
  }, [formFields]);

  useEffect(() => {
    if (formFields[2]['value'] !== '') {
      if (!isLoading) {
        const newFormFields = [...formFields];
        const formField = { ...newFormFields[2] };
        Object.assign(formField, {
          error: zipCodeInfo.city === undefined,
          success: zipCodeInfo.city !== undefined,
        });
        newFormFields[2] = formField;
        setFormFields(newFormFields);
      }
    }
  }, [zipCodeInfo]);

  return (
    <Box
      step="1"
      totalSteps="3"
      title="Choose Your Vehicle"
      subtitle="Select a Model and Enter Your Zip to Continue..."
    >
      <Select
        id="make"
        initialValue={preSelectedMakeName}
        name="make"
        label="Make"
        cue={cue === 'make'}
        error={error === 'make'}
        message="Select a"
        options={makes}
        handlerChange={(e) => validateDropdown(e, 0, handleMakeChange)}
      />
      <Select
        id="model"
        initialValue={preSelectedModelName}
        name="model"
        label="Model"
        cue={cue === 'model'}
        error={error === 'model'}
        message="Select a"
        options={models}
        handlerChange={(e) => validateDropdown(e, 1, handleModelChange)}
      />
      <Input
        id="zip-code"
        name="zip-code"
        label="Zip Code"
        icon="#icon-location"
        cue={cue === 'zip-code'}
        error={error === 'zip-code'}
        success={zipCodeInfo.city !== undefined}
        type="tel"
        message="Please enter a valid"
        length={5}
        handlerBlur={handlerZipBlur}
        handlerChange={validateZipCode}
        handlerEffect={valueFromReload}
        autocomplete="off"
        onlyNumbers
      />
      <Button disabled={isLoading} loading={isLoading} handlerClick={handleSubmit}>
        {buttonText}
      </Button>
    </Box>
  );
};

export default FormOne;
