import React from 'react'
import { EyeCloseIcon, EyeOpenIcon } from '../../images/svg';


const GlobalInput = ({
    label,
    placeholder,
    type,
    required,
    name,
    isError,
    error,
    value,
    onChange
}: {
    name: string;
    label?: string;
    placeholder?: string;
    type: string;
    required?: boolean;
    isError?: any;
    error?: any;
    value?: any,
    onChange?: any;
}) => {

    const [showPassword, setShowPassword] = React.useState(false);


    return (
        <div className='flex flex-col gap-2'>
            <div className="text-sm font-medium">
                {label} {required && <span className='text-redDanger'>*</span>}
            </div>
            <div className="relative flex items-center justify-center">
                <input
                    name={name}
                    type={type === 'password' ? showPassword ? 'text' : 'password' : type}
                    placeholder={placeholder}
                    className={`outline-none border py-2 px-4 text-xs rounded-full w-full ${isError ? 'border-redDanger' : 'border-blueGrey'}`}
                    value={value}
                    onChange={onChange}
                />
                {type === 'password'
                    &&
                    <button
                        className='absolute right-5'
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeCloseIcon className='w-5' /> : <EyeOpenIcon className='w-5' />}
                    </button>
                }
                {/* {isError &&
                    <span className='absolute right-4'>
                        <WarningIcon className='w-4' />
                    </span>
                } */}
            </div>
            <span className={`text-xs text-redDanger text-right ${isError ? `visible` : `invisible`}`}>{error}</span>
        </div>
    )
}

export default GlobalInput