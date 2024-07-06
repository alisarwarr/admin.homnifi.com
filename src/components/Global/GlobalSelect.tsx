import React from 'react'

import { ReactComponent as ArrowDownIcon } from '../../SVGIcons/arrowDown.svg'

interface IOptions {
    name: string,
    value: string
}

const GlobalSelect = ({
    name,
    label,
    required,
    placeholder,
    options
}: {
    name: string;
    label?: string;
    required?: boolean;
    placeholder?: string;
    options: IOptions[]
}) => {

    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filteredOptions, setFilteredOptions] = React.useState(options);

    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(prev => !prev)
    }

    const handleSelectValue = (value: string) => {
        if (value) {
            setSelectedValue(value);
            setIsOpen(false)
        }
    }

    const filterOptions = (input: string) => {
        const filtered = options.filter(option =>
            option.name.toLowerCase().includes(input.toLocaleLowerCase())
        )
        setFilteredOptions(filtered);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        filterOptions(e.target.value);
    }

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    return (
        <div className='flex flex-col gap-2 text-sm'>
            <div className=" font-medium">
                {label} {required && <span className='text-redDanger'>*</span>}
            </div>
            <div className='relative select-none'>
                <div
                    className='bg-white border border-blueGrey py-2 px-4 text-xs rounded-full w-full cursor-pointer'
                    onClick={toggleDropdown}
                >
                    {selectedValue ? options.find(option => option.value === selectedValue)?.name : placeholder}
                </div>

                <div ref={dropdownRef} className={`text-xs flex flex-col w-full rounded-xl shadow-lg absolute top-10 left-0 border border-blueGrey bg-white overflow-auto max-h-52 ${isOpen ? 'translate-y-0 visible opacity-100' : '-translate-y-10 invisible opacity-0'} transition-all ease-in-out duration-300`}
                    style={{ zIndex: 99 }}
                >
                    <input
                        type="text"
                        placeholder='search...'
                        className='outline-none p-2 border-b border-blueGrey'
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    {filteredOptions.map((option, index) => (
                        <button key={index} className='p-2 border-b border-blueGrey hover:bg-gray-100 transition-all ease-in-out duration-300'
                            onClick={() => handleSelectValue(option.value)}
                        >
                            {option.name}
                        </button>
                    ))}
                </div>
                <div className="absolute top-3 right-4" style={{ zIndex: 99 }}>
                    <ArrowDownIcon className={`w-3 h-3 transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`} />
                </div>
            </div>
        </div>
    )
}

export default GlobalSelect