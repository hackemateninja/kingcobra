// Packages
import React, { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { domains, names, wordDifference } from "./word-difference";
import Cookies from "js-cookie";

// Definitions
import { IPlainObject } from "@/def/IPlainObject";
import { IFields, fieldAction } from "@/def/IValidations";
import { IPostLeadParams } from "@/def/IPostLeadParams";

// Slices
import {
  postLeads,
  saveAddress,
  saveEmail,
  saveFirstName,
  saveFirstSuggested,
  saveLastName,
  savePhoneNumber,
  saveShowSuggested,
} from "@/redux/slices/step-two";
import { setButtonLoading } from "@/redux/slices/site";

// Components
import Box from "@/comp/box";
import Button from "@/comp/button";
import Input from "@/comp/form-elements/input";
import EmailSuggested from "@/comp/email-suggested";
import AddressAutocomplete from "@/comp/address-autocomplete";
import { EmailSuggestedAnimation } from "@/comp/email-suggested/style";

// Styles
import { InputRow } from "./style";
import { RootState } from "@/def/TRootReducer";

import { config } from "@/util/config";

declare const window: any;

const FormTwo: React.FC<IPlainObject> = (props) => {
  const dispatch = useDispatch();
  const [cue, setCue] = useState<string>("first-name");
  const [error, setError] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [emailValue, setEmailValue] = useState<string>("");
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [addressValue, setAddressValue] = useState<string>("");
  const [addressAutocomplete, setAddressAutocomplete] = useState<object[]>([]);
  const [autocomplete, setAutocomplete] = useState({ show: false, lastValue: "" });

  const button = useSelector((state: RootState) => state.stepTwo.ui.button);
  const uiSuggested = useSelector((state: RootState) => state.stepTwo.ui);
  const stepOne = useSelector((state: RootState) => state.stepOne.data);
  const stepTwo = useSelector((state: RootState) => state.stepTwo.data);
  const utsCookie = Cookies.get("uts-session");

  // form validation initialization

  const fieldsList = ["first-name", "last-name", "phone-number", "address", "email"];

  let formValues: IFields[] = [];
  fieldsList.map((input) => {
    formValues[input] = { field: input, value: "", status: "empty" };
  });

  // form validation reducer

  const [fields, formDispatch] = useReducer(formReducer, formValues);

  function formReducer(state, action: fieldAction) {
    let field = state[action.payload.field];
    switch (action.type) {
      case "setEmpty": {
        Object.assign(field, { status: "empty", value: "" });
        return { ...state };
      }
      case "setSuccess": {
        Object.assign(field, { status: "success", value: action.payload.value });
        return { ...state };
      }
      case "setError": {
        Object.assign(field, { status: "error", value: action.payload.value });
        return { ...state };
      }
      default:
        return state;
    }
  }

  // Update Cue

  const updateCue = () => {
    for (let i = 0; i < fieldsList.length; i++) {
      switch (true) {
        case fields[fieldsList[i]].status === "error":
          setError(fieldsList[i]);
          setCue(fieldsList[i]);
          return;
        case fields[fieldsList[i]].status === "empty":
          setCue(fieldsList[i]);
          return;
        default:
          setCue("");
      }
    }
  };

  useEffect(() => {
    updateCue();
    window.dataLayer && window.dataLayer.push({ event: "form_impression" });
  }, []);

  // Input validation

  const validateInput = (
    e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>,
    inputName: string,
    dispatchFunction: Function
  ) => {
    const target = e.target as HTMLInputElement;

    // reset error before update
    setError("");
    // update store
    dispatch(dispatchFunction(target.value));

    if (target.value.length > 0) {
      switch (true) {
        case inputName === "phone-number":
          validatePhone(target.value, inputName);
          break;
        case inputName === "email":
          validateEmail(target.value, inputName);
          break;
        default:
          formDispatch({ type: "setSuccess", payload: { field: inputName, value: target.value } });
      }
    } else {
      formDispatch({ type: "setEmpty", payload: { field: inputName, value: "" } });
    }

    updateCue();
  };

  // Phone validation

  const validatePhone = (value: string, inputName: string) => {
    if (value.length === 14) {
      error === "phone-number" ? setError("") : null;
      formDispatch({ type: "setSuccess", payload: { field: inputName, value: value } });
    } else {
      formDispatch({ type: "setError", payload: { field: inputName, value: value } });
    }
  };

  // Phone Mask

  const handlerPhoneMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const value = input.value;
    const numbers = value.replace(/\D/g, "");
    const match = numbers.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    const matchOne = numbers.length > 3 ? `(${match[1]}) ` : match[1];
    const matchTwo = numbers.length > 6 ? `${match[2]}-` : match[2];
    setPhoneValue(matchOne + matchTwo + match[3]);

    if (numbers.length === 10) {
      formDispatch({ type: "setSuccess", payload: { field: input.id, value: input.value } });
    } else {
      formDispatch({ type: "setEmpty", payload: { field: input.id, value: input.value } });
    }

    dispatch(savePhoneNumber(input.value));
  };

  // Email validation

  const validateEmail = (value: string, inputName: string) => {
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (emailRegex.test(value)) {
      emailSuggested(value);
      error === "email" ? setError("") : null;
      formDispatch({ type: "setSuccess", payload: { field: inputName, value: value } });
    } else {
      formDispatch({ type: "setError", payload: { field: inputName, value: value } });
    }
  };

  // Email suggestion

  const handlerEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const input = e.target;

    setEmailValue(input.value);

    if (emailRegex.test(input.value)) {
      formDispatch({ type: "setSuccess", payload: { field: input.id, value: input.value } });
    } else {
      formDispatch({ type: "setEmpty", payload: { field: input.id, value: input.value } });
    }

    dispatch(saveEmail(input.value));
  };

  const emailSuggested = (value: string) => {
    if (value.length !== 0) {
      const lastAt = value.lastIndexOf("@");
      const lastPoint = value.lastIndexOf(".");
      const name = value.substring(0, lastAt);
      const host = value.substring(lastAt + 1);
      const domain = value.substring(lastPoint + 1);
      const domainName = host.split(".");

      let newName: string = wordDifference(domainName[0], 3, names);
      let newDomain: string = wordDifference(domain, 3, domains);

      newName.length !== 0 || newDomain.length !== 0
        ? dispatch(saveShowSuggested(true))
        : dispatch(saveShowSuggested(false));

      newName = newName.length === 0 ? domainName[0] : newName;
      newDomain = newDomain.length === 0 ? domain : newDomain;

      setNewEmail(`${name}@${newName}.${newDomain}`);
    }
  };

  const handlerSuggested = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    dispatch(saveShowSuggested(false));
    dispatch(saveFirstSuggested(false));
    if (target.dataset.action === "yes") {
      setEmailValue(newEmail);
      dispatch(saveEmail(newEmail));
      // update form state
      formDispatch({ type: "setSuccess", payload: { field: "email", value: newEmail } });
    }
  };

  const submitAction = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setButtonLoading(true));

    // set error if any field is empty
    for (let i = 0; i < fieldsList.length; i++) {
      if (fields[fieldsList[i]].status === "empty") {
        setError(fieldsList[i]);
        dispatch(setButtonLoading(false));
        return;
      }
    }

    const utsValues = JSON.parse(decodeURI(utsCookie));
    const values: IPostLeadParams = {
      customer: {
        firstName: stepTwo.first,
        lastName: stepTwo.last,
        address: addressValue,
        phone: phoneValue,
        email: emailValue,
        zip: stepOne.zipcode.zip,
        city: stepOne.zipcode.city,
        state: stepOne.zipcode.state,
      },
      vehicle: {
        make: stepOne.selectedMake.name,
        model: stepOne.selectedModel.name,
        year: stepOne.selectedModel.year,
      },
      sourceId: config.sourceId,
      selectedDealers: stepTwo.selectedDealers.map((dealer) => ({
        programId: dealer.programId,
        dealerId: dealer.id,
        dealerCode: dealer.dealerCode,
        distance: dealer.distance,
      })),
      device: stepTwo.device,
      transactionId: stepTwo.transactionId,
      sessionId: utsValues.utss,
    };

    dispatch(postLeads(values));

    props.onSubmit(e);
    dispatch(setButtonLoading(false));
  };

  // Form Submit

  const handlerSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!uiSuggested.showSuggested) {
      submitAction(e);
    }
  };

  // Form Autocomplete
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>, dispatchFunction: Function) => {
    const input = e.target;
    if (input.value.length !== 0) {
      formDispatch({ type: "setSuccess", payload: { field: input.id, value: input.value } });
    } else {
      formDispatch({ type: "setEmpty", payload: { field: input.id, value: input.value } });
    }

    dispatch(dispatchFunction(input.value));
  };

  // Address autocomplete

  const handlerAutocomplete = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const ssURL = "https://us-autocomplete-pro.api.smartystreets.com/lookup";
    const ssKey = `?auth-id=${config.ssAuthToken}`;
    const ssZipCode = `&include_only_zip_codes=${props.zipcode}`;
    const ssSearch = `&search=${input.value}`;
    setAddressValue(input.value);

    if (input.value.length !== 0) {
      const resAutocomplete = await fetch(ssURL + ssKey + ssZipCode + ssSearch);
      const jsonAutocomplete = await resAutocomplete.json();

      setAddressAutocomplete(jsonAutocomplete.suggestions !== null ? jsonAutocomplete.suggestions : []);
      setAutocomplete({ show: true, lastValue: autocomplete.lastValue });
      formDispatch({ type: "setSuccess", payload: { field: input.id, value: input.value } });
    } else {
      setAutocomplete({ show: false, lastValue: autocomplete.lastValue });
      setAddressAutocomplete([]);
      formDispatch({ type: "setEmpty", payload: { field: input.id, value: input.value } });
    }

    dispatch(saveAddress(input.value));
  };

  const setNewAddress = (e: React.MouseEvent<HTMLLIElement>, address: string) => {
    setAddressValue(address);
    setAutocomplete({ show: false, lastValue: address });
    dispatch(saveAddress(address));
  };

  const validateOnEnter = ( e: React.KeyboardEvent<HTMLInputElement> ) => {
		if ( e.key === 'Enter' ) {
			validateInput(e, 'email', saveEmail);
		}
	};

  // Reset errors
  const resetErrors = (elem: HTMLInputElement) => setError("");

  return (
    <Box step="3" totalSteps="3" title="Complete Your Information">
      <form onSubmit={handlerSubmit}>
        <InputRow>
          <Input
            id="first-name"
            type="text"
            name="first-name"
            label="First Name"
            cue={cue === "first-name"}
            error={error === "first-name"}
            success={fields["first-name"].status === "success"}
            message="Enter"
            handlerBlur={(e) => validateInput(e, "first-name", saveFirstName)}
            handlerChange={(e) => handlerChange(e, saveFirstName)}
            handlerFocus={(e) => resetErrors(e.target)}
          />
          <Input
            id="last-name"
            type="text"
            name="last-name"
            label="Last Name"
            cue={cue === "last-name"}
            error={error === "last-name"}
            success={fields["last-name"].status === "success"}
            message="Enter"
            handlerBlur={(e) => validateInput(e, "last-name", saveLastName)}
            handlerFocus={(e) => resetErrors(e.target)}
            handlerChange={(e) => handlerChange(e, saveLastName)}
          />
        </InputRow>
        <Input
          id="phone-number"
          type="tel"
          name="phone-number"
          label="Phone Number"
          cue={cue === "phone-number"}
          error={error === "phone-number"}
          success={fields["phone-number"].status === "success"}
          dynamicValue={phoneValue}
          length={14}
          message="Enter a"
          handlerBlur={(e) => validateInput(e, "phone-number", savePhoneNumber)}
          handlerChange={handlerPhoneMask}
          handlerFocus={(e) => resetErrors(e.target)}
          onlyNumbers
        />
        <Input
          id="address"
          type="text"
          name="address"
          label="Address"
          cue={cue === "address"}
          error={error === "address"}
          success={fields["address"].status === "success"}
          dynamicValue={addressValue}
          message="Enter a"
          autocomplete="off"
          city={props.city}
          handlerBlur={(e) => validateInput(e, "address", saveAddress)}
          handlerChange={handlerAutocomplete}
          handlerFocus={(e) => resetErrors(e.target)}
        />
        {autocomplete.show && autocomplete.lastValue !== addressValue && (
          <AddressAutocomplete items={addressAutocomplete} value={addressValue} handlerClick={setNewAddress} />
        )}
        <CSSTransition
          unmountOnExit
          in={uiSuggested.showSuggested && uiSuggested.firstSuggested}
          timeout={300}
          classNames="email-suggested"
        >
          <EmailSuggestedAnimation>
            <EmailSuggested email={newEmail} hanlderAction={handlerSuggested} />
          </EmailSuggestedAnimation>
        </CSSTransition>
        <Input
          id="email"
          dynamicValue={emailValue}
          type="email"
          name="email"
          label="Email Address"
          cue={cue === "email"}
          error={error === "email"}
          success={fields["email"].status === "success"}
          message="Enter an"
          handlerKeypress={(e) => validateOnEnter(e)}
          handlerChange={handlerEmailChange}
          handlerBlur={(e) => validateInput(e, "email", saveEmail)}
          handlerFocus={(e) => resetErrors(e.target)}
        />
        <Button type="submit">{button}</Button>
      </form>
    </Box>
  );
};

export default FormTwo;
