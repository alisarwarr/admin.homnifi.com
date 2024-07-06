import React from 'react'

const HelperText = ({
    text
}: {
    text: JSX.Element;
}) => {
    return (
        <div className='text-center font-medium text-primaryGrey'>
            {text}
        </div>
    )
}

export default HelperText