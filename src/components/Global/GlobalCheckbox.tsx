import React from 'react'

const GlobalCheckbox = ({
    label,
    checked,
    setChecked
}: {
    label?: string;
    checked: boolean;
    setChecked: (e: boolean) => void;
}) => {
    return (
        <div className='flex items-center gap-2 select-none'>
            <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
            {label && <span className='text-xs text-primaryGrey cursor-pointer' onClick={() => setChecked(!checked)}>{label}</span>}
        </div>
    )
}

export default GlobalCheckbox