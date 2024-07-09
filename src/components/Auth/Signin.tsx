import React from 'react'

import { useNavigate } from 'react-router-dom'
import AuthHeading from './AuthHeading'
import GlobalInput from '../Global/GlobalInput'
import GlobalCheckbox from '../Global/GlobalCheckbox'
import Captcha from './Captcha'
import GlobalButton from '../Global/GlobalButton'
import HelperText from '../Global/HelperText'

const Signin = ({
    setStatus
}: {
    setStatus: () => void;
}) => {
    const [terms, setTerms] = React.useState(false);
    const navigate = useNavigate()

    return (
        <div className="w-full p-4 flex flex-col gap-10 justify-center">
            <AuthHeading
                title='Sign in to your Account'
                subtitle={
                    <div>
                        Don't have an account? <button onClick={() => navigate('/auth/signup')} className="text-primary">Signup</button>
                    </div>
                }
            />
            <div className="w-full flex flex-col gap-4 pr-10">
                <GlobalInput
                    name='email'
                    label='Email Address'
                    placeholder='Enter your email address'
                    type='email'
                    required
                />
                <GlobalInput
                    name='password'
                    label='Password'
                    placeholder='Enter your password'
                    type='password'
                    required
                />
                <GlobalCheckbox
                    checked={terms}
                    setChecked={setTerms}
                    label="Remember Me"
                />
            </div>
            <Captcha />
            <div className="flex flex-col gap-2">
                <GlobalButton
                    text='Sign in'
                    setStatus={() => setStatus}
                    status={'verifyEmail'}
                    loading={false}
                />
                <HelperText
                    text={<button onClick={() => navigate('/auth/forget-password')}>Forget Password?</button>}
                />
            </div>
        </div>
    )
}

export default Signin