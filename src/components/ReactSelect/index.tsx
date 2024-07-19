import React, { useState } from 'react';
import Select from 'react-select';
import { components } from 'react-select';
import { closeWhite } from '../../images/other';
import { isError } from 'lodash';

type Props = {
  formik: any;
  label: string;
  options: any;
  stylesObject?: object;
  height?: string;
  name: string;
  className?: string;
  selectContainerClassName?: string;
  isSearchable?: boolean;
  onChange?: any;
  placeholder?: string;
  isAddButton?: boolean;
  isAddButtonText?: string;
  disabled?: boolean;
  placeholderColor?: string;
  isClearable?: boolean;
  clearValueHandler?: () => void;
  isMulti?: boolean;
  isError?: boolean;
};
const { ValueContainer, Placeholder, ClearIndicator } = components;

const CustomValueContainer = (props: any) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(props.children, (child) => (child && child.type !== Placeholder ? child : null))}
    </ValueContainer>
  );
};

const ReactSelect = ({
  formik,
  options,
  height = '50.39px',
  name,
  className = '',
  selectContainerClassName = '',
  isSearchable = false,
  onChange = (e: any) => {
    formik.setFieldValue(name, e?.value);
  },
  placeholder,
  disabled = false,
  placeholderColor,
  isClearable,
  clearValueHandler = () => {},
  isMulti = false,
  isError = false,
}: Props) => {
  const [focused, setFocused] = useState(false);

  const CustomClearIndicator = (props) => {
    return (
      <ClearIndicator {...props}>
        <div onClick={clearValueHandler} className="cursor-pointer">
          <img src={closeWhite} />
        </div>
      </ClearIndicator>
    );
  };

  //   : formik?.errors[name] && formik?.touched[name]
  //   ? '1px solid #1B9FDA'
  //   : '1px solid #D7D7D7',
  // '&:hover': {
  //   border: !state.isFocused && '1px solid #1B9FDA',

  return (
    <>
      <div className={`${selectContainerClassName} flex flex-col w-full z-0  text-primary `}>
        <div className="flex items-center w-full">
          <Select
            className={`w-full ${className}`}
            name={name}
            options={options}
            value={formik?.values[name]}
            isSearchable={isSearchable}
            components={{
              ValueContainer: CustomValueContainer,
              ClearIndicator: CustomClearIndicator,
            }}
            menuPortalTarget={document.body}
            styles={{
              // @ts-ignore
              control: (baseStyles, state) => {
                setFocused(state.isFocused);
                return {
                  ...baseStyles,
                  minHeight: height,
                  backgroundColor: 'transparent',
                  color: '#1B9FDA',
                  border: state.isFocused
                    ? 'none'
                    : (formik?.errors[name] && formik?.touched[name]) || isError
                      ? '1px solid #f44336'
                      : '1px solid #D7D7D7',
                  '&:hover': {
                    border: !state.isFocused && '1px solid #1B9FDA',
                  },
                  boxShadow: '0px',
                  outline: state.isFocused && '2px #90CAF9 solid',
                };
              },
              menuList: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: 'white',
              }),
              menuPortal(base) {
                return {
                  ...base,
                  zIndex: 9999,
                };
              },
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isSelected ? '#1B9FDA' : 'transparent',
                color: state.isSelected ? 'white' : '#1B9FDA',
                zIndex: 100,
                '&:hover': {
                  color: '#262626',
                  backgroundColor: 'white',
                },
              }),
              input: (baseStyles) => ({
                ...baseStyles,
                color: 'gray',
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                color: '#666666',
              }),
              multiValue: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: 'red',
              }),
              multiValueLabel: (baseStyles) => ({
                ...baseStyles,
                color: '#666666',
              }),
              placeholder: (provided, state) => ({
                ...provided,
                color: disabled ? '#666666' : focused ? '#1B9FDA' : '#666666',
                backgroundColor:
                  state.hasValue || state.selectProps.inputValue
                    ? placeholderColor
                      ? placeholderColor
                      : 'white'
                    : 'transparent',
                padding: '0px 4px',
                position: 'absolute',
                display: isMulti && state.hasValue ? 'none' : 'block',
                top: state.hasValue || state.selectProps.inputValue ? '-22px' : isSearchable ? '5px' : '0px',
                transition: 'top 0.1s, font-size 0.1s',
                fontSize: (state.hasValue || state.selectProps.inputValue) && '12px',
              }),
              valueContainer: (provided) => ({
                ...provided,
                overflow: 'visible',
              }),
            }}
            onChange={(e: any) => {
              console.log({ e });
              if (isMulti) {
                onChange(e);
              } else if (typeof e?.label === 'string') {
                onChange(e);
              }
            }}
            placeholder={
              placeholder ? placeholder : `Select ${name[0].toUpperCase().concat(name.slice(1, name.length))}...`
            }
            isDisabled={disabled}
            isClearable={isClearable}
            isMulti={isMulti}
          />
        </div>

        {formik?.errors[name] && formik?.touched[name] && (
          <div className="text-errorColor text-xs mt-1">{formik?.errors[name]}</div>
        )}
      </div>
    </>
  );
};

export default ReactSelect;
