import React from 'react';
import { ReactComponent as ArrowDownIcon } from '../../SVGIcons/arrowDown.svg';
import { lowerCaseAllLetters } from '../../utils/utils';

interface IOptions {
  label: string;
  value: string;
}

type TGlobalSelect = {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  options: IOptions[];
  onChange?: (value: string | string[] | any) => void;
  onBlur?: (e: React.ChangeEvent<HTMLDivElement>) => void;
  setFieldTouched?: any;
  setFieldValue: any;
  isError: boolean | undefined;
 error?: string | any;
  value?: string | string[];
  isMulti?: boolean;
  inputClass?: string;
};

const GlobalSelect = ({
  name,
  label,
  required,
  placeholder,
  options,
  onBlur,
  onChange,
  setFieldTouched,
  isError,
  error,
  setFieldValue,
  value = '',
  isMulti = false,
  inputClass,
}: TGlobalSelect) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredOptions, setFilteredOptions] = React.useState(options);

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    setFieldTouched(name, true);
  };

  const handleSelectValue = (selectedOption: IOptions) => {

    onChange && onChange(selectedOption);

  console.log("🚀 ~ handleSelectValue ~ selectedOption:", selectedOption)


    const selectedValue = selectedOption.value;
    let newValue;
    if (isMulti) {
      if (Array.isArray(value)) {
        if (value.includes(selectedValue)) {
          newValue = value.filter((val) => val !== selectedValue);
        } else {
          newValue = [...value, selectedValue];
        }
      } else {
        newValue = [selectedValue];
      }
    } else {
      newValue = selectedValue;
      setIsOpen(false);
    }
    setFieldValue(name, selectedOption);
    // onChange && onChange(selectedOption); // Optionally trigger onChange if needed
  };

  const filterOptions = (input: string) => {
    const filtered = options.filter((option) => option.label.toLowerCase().includes(input.toLowerCase()));
    setFilteredOptions(filtered);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    filterOptions(e.target.value);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  console.log('isError , error', options.find((option) => option.value === value)?.label  , value , options)

  return (
    <div className="flex flex-col gap-2 text-sm py-2">
      <div className="font-medium text-primary">
        {label} {required && <span className="text-redDanger">*</span>}
      </div>
      <div className="relative select-none">
        <div
          className={`bg-white text-gray-400  border ${
            isError ? 'border-redDanger' : 'border-blueGrey'
          } py-2 px-4 text-xs rounded-full w-full cursor-pointer ${inputClass}`}
          onClick={toggleDropdown}
        >
          {options.find((option) => option.value === value)?.label || placeholder}
        </div>

        <div
          ref={dropdownRef}
          className={`text-xs flex flex-col w-full rounded-xl shadow-lg absolute top-10 left-1 border border-blueGrey bg-white overflow-auto max-h-52 ${
            isOpen ? 'translate-y-0 visible opacity-100 ' : '-translate-y-10 invisible opacity-0'
          } transition-all ease-in-out duration-300`}
          style={{ zIndex: 99 }}
        >
          <input
            type="text"
            placeholder="search..."
            className="outline-none p-2 border-b border-blueGrey"
            value={searchTerm}
            onChange={handleInputChange}
          />
          {filteredOptions.map((option, index) => (
            <button
              type="button"
              key={index}
              className={`p-2 border-b border-blueGrey text-defaultBlack hover:bg-gray-100 transition-all ease-in-out duration-300 ${
                Array.isArray(value) && value.includes(option.value) ? 'bg-blue-100' : ''
              }`}
              onClick={() => handleSelectValue(option)}

            >
              {option.label}
            </button>
          ))}
        </div>
        <div className={`absolute ${isOpen ? 'top-3' :'top-2'} right-3 bg-red`} style={{ zIndex: 100 }}>
          <ArrowDownIcon
            className={`w-4 h-4 transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}
          />
        </div>
      </div>
      {isError  && (
        <span className="text-xs text-redDanger text-right">{error}</span>
      )}
    </div>
  );
};

export default GlobalSelect;
