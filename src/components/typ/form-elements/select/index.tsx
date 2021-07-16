// Packages
import { useState, useEffect } from 'react';

// Definitions
import { ISelect } from '@/def/ISelect';

// Components
import Cue from '../cue';

// Styles
import { FormElement, FormElementLabel, FormElementMessage, Element, FormElementArrow } from '../style';
import { IMake } from '@/def/IMake';
import { IModel } from '@/def/IModel';

const Select: React.FC<ISelect> = (props) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(!props.initialValue ? false : true);

  const handlerFocus = (e) => setFocus(true);
  const handlerBlur = (e) => setFocus(false);
  const handlerChange = (e) => {
    props.handlerChange !== undefined && props.handlerChange(e);
    e.target.value.length !== 0 ? setEmpty(false) : setEmpty(true);
    e.target.blur();
  };

  useEffect(() => {
    props.options.length === 0 && setEmpty(true);
  }, [props.options.length]);

  return (
    <FormElement active={focus || !empty} cue={props.cue} error={props.error}>
      <Element
        id={props.id}
        name={props.name}
        defaultValue={props.initialValue}
        onFocus={handlerFocus}
        onBlur={handlerBlur}
        onChange={handlerChange}
        active={focus || !empty}
        as="select"
        disabled={props.options.length === 0}
      >
        <option value="">Select a {props.label}</option>
        {props.options &&
          props.options.map((option: IMake | IModel, index: number) => (
            <option key={index} data-id={option.id} value={option.seoName} data-image={option.mediumJpg}>
              {option.name}
            </option>
          ))}
      </Element>
      <FormElementArrow focus={focus} />
      <FormElementLabel htmlFor={props.id} active={focus || !empty} select>
        {props.label}
      </FormElementLabel>
      {props.cue && <Cue />}
      {props.error && (
        <FormElementMessage>
          {props.message} {props.label.toLocaleLowerCase()}
        </FormElementMessage>
      )}
    </FormElement>
  );
};

export default Select;
