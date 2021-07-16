// Packages
import { useEffect, useState, useReducer } from 'react';
import { CSSTransition } from 'react-transition-group';
import { domains, names, wordDifference } from './word-difference';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { IFields, fieldAction } from '@/def/IValidations';

// Components
import Box from '@/comp/box';
import Button from '@/comp/button';
import Input from '@/comp/form-elements/input';
import EmailSuggested from '@/comp/email-suggested';
import AddressAutocomplete from '@/comp/address-autocomplete';
import { EmailSuggestedAnimation } from '@/comp/email-suggested/style';
import SendInfo from '@/comp/send-info';

// Styles
import { InputRow } from './style';

// Utilities
import { config } from '@/util/config';

declare const window: any;

const FormTwo: React.FC<IPlainObject> = (props) => {
  const { zipCodeInfo, onSubmit } = props;

  const [cue, setCue] = useState<string>('first-name');
  const [error, setError] = useState<string>('');
  const [suggestedEmail, setSuggestedEmail] = useState<string>('');
  const [addressAutocomplete, setAddressAutocomplete] = useState<object[]>([]);
  const [autocomplete, setAutocomplete] = useState({ show: false, lastValue: '' });
  const [sendInfo, setSendInfo] = useState<boolean>(true);

  const [firstSuggested, setFirstSuggested] = useState<boolean>(true);
  const [showSuggested, setShowSuggested] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [phoneMasked, setPhoneMasked] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // form validation initialization
  const fieldsList = ['first-name', 'last-name', 'phone-number', 'address', 'email'];

  const formValues: IFields[] = [];
  fieldsList.map((input) => {
    formValues[input] = { field: input, value: '', status: 'empty' };
  });

  // Form validation reducer
  function formReducer(state, action: fieldAction) {
    const field = state[action.payload.field];
    switch (action.type) {
      case 'setEmpty': {
        Object.assign(field, { status: 'empty', value: '' });
        return { ...state };
      }
      case 'setSuccess': {
        Object.assign(field, { status: 'success', value: action.payload.value });
        return { ...state };
      }
      case 'setError': {
        Object.assign(field, { status: 'error', value: action.payload.value });
        return { ...state };
      }
      default:
        return state;
    }
  }

  const [fields, formDispatch] = useReducer(formReducer, formValues);

  // Update Cue
  const updateCue = () => {
    for (let i = 0; i < fieldsList.length; i++) {
      switch (true) {
        case fields[fieldsList[i]].status === 'error':
          setError(fieldsList[i]);
          setCue(fieldsList[i]);
          return;
        case fields[fieldsList[i]].status === 'empty':
          setCue(fieldsList[i]);
          return;
        default:
          setCue('');
      }
    }
  };

  useEffect(() => {
    updateCue();
    window.dataLayer && window.dataLayer.push({ event: 'form_impression' });

    firstName !== '' && formDispatch({ type: 'setSuccess', payload: { field: 'first-name', value: firstName } });
    lastName !== '' && formDispatch({ type: 'setSuccess', payload: { field: 'last-name', value: lastName } });

    if (phone !== '') {
      formDispatch({ type: 'setSuccess', payload: { field: 'phone-number', value: phone } });
    }
    if (address !== '') {
      formDispatch({ type: 'setSuccess', payload: { field: 'address', value: address } });
    }
    if (email !== '') {
      formDispatch({ type: 'setSuccess', payload: { field: 'email', value: email } });
    }
  }, []);

  // Input validation
  const validateInput = (
    e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>,
    inputName: string,
    dispatchFunction: Function
  ) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    setError('');
    dispatchFunction(value);

    if (value.length > 0 && !value.startsWith(' ')) {
      switch (true) {
        case inputName === 'phone-number':
          validatePhone(value, inputName);
          break;
        case inputName === 'email':
          validateEmail(value, inputName);
          break;
        default:
          formDispatch({ type: 'setSuccess', payload: { field: inputName, value } });
      }
    } else {
      formDispatch({ type: 'setEmpty', payload: { field: inputName, value: '' } });
    }

    updateCue();
  };

  // Phone validation
  const validatePhone = (value: string, inputName: string) => {
    if (value.length === 14) {
      error === 'phone-number' ? setError('') : null;
      formDispatch({ type: 'setSuccess', payload: { field: inputName, value: value } });
    } else {
      formDispatch({ type: 'setError', payload: { field: inputName, value: value } });
    }
  };

  // Phone Mask
  const handlerPhoneMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const value = input.value;
    const numbers = value.replace(/\D/g, '');
    const match = numbers.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    const matchOne = numbers.length > 3 ? `(${match[1]}) ` : match[1];
    const matchTwo = numbers.length > 6 ? `${match[2]}-` : match[2];
    setPhoneMasked(matchOne + matchTwo + match[3]);

    if (numbers.length === 10) {
      formDispatch({ type: 'setSuccess', payload: { field: input.id, value: input.value } });
    } else {
      formDispatch({ type: 'setEmpty', payload: { field: input.id, value: input.value } });
    }

    setPhone(input.value);
  };

  // Email validation
  const validateEmail = (value: string, inputName: string) => {
    const emailRegex =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (emailRegex.test(value)) {
      emailSuggested(value);
      error === 'email' ? setError('') : null;
      formDispatch({ type: 'setSuccess', payload: { field: inputName, value: value } });
    } else {
      formDispatch({ type: 'setError', payload: { field: inputName, value: value } });
    }
  };

  // Email suggestion
  const handlerEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const emailRegex =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (emailRegex.test(input.value)) {
      formDispatch({ type: 'setSuccess', payload: { field: input.id, value: input.value } });
    } else {
      formDispatch({ type: 'setEmpty', payload: { field: input.id, value: input.value } });
    }
    setEmail(input.value);
  };

  const emailSuggested = (value: string) => {
    if (value.length !== 0 && !value.startsWith(' ')) {
      const lastAt = value.lastIndexOf('@');
      const lastPoint = value.lastIndexOf('.');
      const name = value.substring(0, lastAt);
      const host = value.substring(lastAt + 1);
      const domain = value.substring(lastPoint + 1);
      const domainName = host.split('.');

      let newName: string = wordDifference(domainName[0], 3, names);
      let newDomain: string = wordDifference(domain, 3, domains);

      newName.length !== 0 || newDomain.length !== 0 ? setShowSuggested(true) : setShowSuggested(false);

      newName = newName.length === 0 ? domainName[0] : newName;
      newDomain = newDomain.length === 0 ? domain : newDomain;

      setSuggestedEmail(`${name}@${newName}.${newDomain}`);
    }
  };

  const handlerSuggested = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setShowSuggested(false);
    setFirstSuggested(false);
    if (target.dataset.action === 'yes') {
      setEmail(suggestedEmail);
      formDispatch({ type: 'setSuccess', payload: { field: 'email', value: suggestedEmail } });
    }
  };

  const submitAction = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);

    // set error if any field is empty
    for (let i = 0; i < fieldsList.length; i++) {
      const status = fields[fieldsList[i]].status;
      if (status === 'empty' || status === 'error') {
        setError(fieldsList[i]);
        setIsLoading(false);
        return;
      }
    }

    if (sendInfo) {
      const customer = {
        firstName,
        lastName,
        address,
        phone,
        email,
        zip: zipCodeInfo.zip,
        city: zipCodeInfo.city,
        state: zipCodeInfo.state,
      };

      await onSubmit(e, customer, props.selectedDealers);
    }
  };

  // Form Submit
  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!showSuggested) {
      submitAction(e);
    }
  };

  // Form Autocomplete
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>, dispatchFunction: Function) => {
    const input = e.target;
    if (input.value.length !== 0 && !input.value.startsWith(' ')) {
      formDispatch({ type: 'setSuccess', payload: { field: input.id, value: input.value } });
    } else {
      formDispatch({ type: 'setEmpty', payload: { field: input.id, value: input.value } });
    }

    dispatchFunction(input.value);
  };

  // Address autocomplete
  const handlerAutocomplete = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const inputId = e.target.id;
    const ssURL = 'https://us-autocomplete-pro.api.smartystreets.com/lookup';
    const ssKey = `?auth-id=${config.ssAuthToken}`;
    const ssZipCode = `&include_only_zip_codes=${zipCodeInfo.zip}`;
    const ssSearch = `&search=${value}`;

    setAddress(value);

    if (value.length !== 0 && !value.startsWith(' ')) {
      formDispatch({ type: 'setSuccess', payload: { field: inputId, value: value } });

      const resAutocomplete = await fetch(ssURL + ssKey + ssZipCode + ssSearch);
      const jsonAutocomplete = await resAutocomplete.json();

      setAddressAutocomplete(jsonAutocomplete.suggestions !== null ? jsonAutocomplete.suggestions : []);
      setAutocomplete({ show: true, lastValue: autocomplete.lastValue });
    } else {
      setAutocomplete({ show: false, lastValue: autocomplete.lastValue });
      setAddressAutocomplete([]);
      formDispatch({ type: 'setEmpty', payload: { field: inputId, value: value } });
    }
  };

  const setNewAddress = (e: React.MouseEvent<HTMLLIElement>, address: string) => {
    setAutocomplete({ show: false, lastValue: address });
    setAddress(address);
  };

  const validateOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      validateInput(e, 'email', setEmail);
    }
  };

  // Reset errors
  const resetErrors = (elem: HTMLInputElement) => setError('');

  return (
    <Box step="3" totalSteps="3" title="Complete Your Information">
      <form onSubmit={handleSubmit}>
        <InputRow>
          <Input
            value={firstName}
            id="first-name"
            type="text"
            name="first-name"
            label="First Name"
            cue={cue === 'first-name'}
            error={error === 'first-name'}
            success={fields['first-name'].status === 'success'}
            message="Enter"
            handlerBlur={(e) => validateInput(e, 'first-name', setFirstName)}
            handlerChange={(e) => handlerChange(e, setFirstName)}
            handlerFocus={(e) => resetErrors(e.target)}
          />
          <Input
            value={lastName}
            id="last-name"
            type="text"
            name="last-name"
            label="Last Name"
            cue={cue === 'last-name'}
            error={error === 'last-name'}
            success={fields['last-name'].status === 'success'}
            message="Enter"
            handlerBlur={(e) => validateInput(e, 'last-name', setLastName)}
            handlerFocus={(e) => resetErrors(e.target)}
            handlerChange={(e) => handlerChange(e, setLastName)}
          />
        </InputRow>
        <Input
          id="phone-number"
          type="tel"
          name="phone-number"
          label="Phone Number"
          cue={cue === 'phone-number'}
          error={error === 'phone-number'}
          success={fields['phone-number'].status === 'success'}
          dynamicValue={phoneMasked}
          length={14}
          message="Enter a"
          handlerBlur={(e) => validateInput(e, 'phone-number', setPhone)}
          handlerChange={handlerPhoneMask}
          handlerFocus={(e) => resetErrors(e.target)}
          onlyNumbers
        />
        <Input
          id="address"
          type="text"
          name="address"
          label="Address"
          cue={cue === 'address'}
          error={error === 'address'}
          success={fields['address'].status === 'success'}
          dynamicValue={address}
          message="Enter a"
          autocomplete="off"
          city={zipCodeInfo?.zip && `${zipCodeInfo.city}, ${zipCodeInfo.state} ${zipCodeInfo.zip}`}
          handlerBlur={(e) => validateInput(e, 'address', setAddress)}
          handlerChange={handlerAutocomplete}
          handlerFocus={(e) => resetErrors(e.target)}
        />
        {autocomplete.show && autocomplete.lastValue !== address && (
          <AddressAutocomplete items={addressAutocomplete} value={address} handlerClick={setNewAddress} />
        )}
        <CSSTransition unmountOnExit in={showSuggested && firstSuggested} timeout={300} classNames="email-suggested">
          <EmailSuggestedAnimation>
            <EmailSuggested email={suggestedEmail} handlerAction={handlerSuggested} />
          </EmailSuggestedAnimation>
        </CSSTransition>
        <Input
          id="email"
          dynamicValue={email}
          type="email"
          name="email"
          label="Email Address"
          cue={cue === 'email'}
          error={error === 'email'}
          success={fields['email'].status === 'success'}
          message="Enter an"
          handlerKeypress={(e) => validateOnEnter(e)}
          handlerChange={handlerEmailChange}
          handlerBlur={(e) => validateInput(e, 'email', setEmail)}
          handlerFocus={(e) => resetErrors(e.target)}
        />
        <SendInfo setSendInfo={setSendInfo} />
        <Button disabled={isLoading} loading={isLoading} type="submit">
          {props.buttonText || 'Get Pricing'}
        </Button>
      </form>
    </Box>
  );
};

export default FormTwo;
