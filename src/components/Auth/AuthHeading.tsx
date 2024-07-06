import React from 'react'
import { useNavigate } from 'react-router-dom'

const AuthHeading = ({
    title,
    subtitle
}: {
    title: string;
    subtitle?: JSX.Element;
}) => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-2">
            <div className='font-baumans text-2xl'>
                {title}
            </div>
            <span className='text-sm text-primaryGrey'>
                {subtitle}
            </span>
        </div>
    )
}

export default AuthHeading