// Packages
import React, { useState, useEffect, useRef } from "react";

// Definitions
import { IInput } from "@/def/IInput";

// Components
import Cue from "../cue";

// Styles
import {
  FormElement,
  FormElementLabel,
  FormElementIcon,
  FormElementSuccess,
  FormElementMessage,
  Element,
  City,
} from "../style";

const Input: React.FC<IInput> = (props) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(!props.value ? false : true);
  const inputElement = useRef(null);

  const onlyNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => !e.key.match(/^[0-9]+$/) && e.preventDefault();

  const handlerFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    props.handlerFocus !== undefined && props.handlerFocus(e);
    setFocus(true);
  };

  const handlerBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.value.length !== 0 ? setEmpty(false) : setEmpty(true);
    props.handlerBlur !== undefined && props.handlerBlur(e);
    setFocus(false);
  };

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.handlerChange !== undefined && props.handlerChange(e);
    e.target.value !== "" && setEmpty(false);
  };

  const handlerKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => props.onlyNumbers && onlyNumbers(e);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.value !== "" && setEmpty(false);
      props.handlerEffect !== undefined && props.handlerEffect(inputElement.current.value);
    }
  }, []);

  return (
    <FormElement active={focus || !empty} cue={props.cue} error={props.error} city={props.city}>
      <Element
        id={props.id}
        ref={inputElement}
        defaultValue={props.value}
        value={props.dynamicValue}
        type={props.type}
        name={props.name}
        onFocus={handlerFocus}
        onBlur={handlerBlur}
        onChange={handlerChange}
        onKeyPress={handlerKeyPress}
        maxLength={props.length}
        icon={props.icon != undefined}
        autoComplete={props.autocomplete}
        autoFocus={props.autofocus}
      />
      <FormElementSuccess success={props.success}>
        <use xlinkHref="#icon-check" />
      </FormElementSuccess>
      <FormElementLabel htmlFor={props.id} active={focus || !empty} icon={props.icon !== undefined}>
        {props.label}
      </FormElementLabel>
      {props.icon !== undefined && (
        <FormElementIcon active={focus || !empty}>
          <use xlinkHref={props.icon} />
        </FormElementIcon>
      )}
      {props.cue && <Cue />}
      {props.error && (
        <FormElementMessage>
          {props.message} {props.label.toLocaleLowerCase()}
        </FormElementMessage>
      )}
      {props.city && (
        <City active={focus || !empty} error={props.error}>
          {props.city}
        </City>
      )}
    </FormElement>
  );
};

export default Input;
