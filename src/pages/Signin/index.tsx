import React from 'react'
import AuthHeading from '../../components/AuthHeading'
import GlobalInput from '../../components/Global/GlobalInput'
import GlobalCheckbox from '../../components/Global/GlobalCheckbox'
import Captcha from '../../components/Captcha'
import GlobalButton from '../../components/Global/GlobalButton'
//FORMIK & YUP
import { useFormik } from "formik"
import * as Yup from "yup"
import { useUserActions } from '../../store/user/userActions'


const Signin = ({
    setStatus
}: {
    setStatus?: () => void;
}) => {
    const [terms, setTerms] = React.useState(false);


    const { userLogin } = useUserActions();


    interface FormValues {
        email: string;
        password: string;
        rememberPassword: boolean;
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberPassword: false
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required("Email or Username is required"),
            password: Yup.string().required("Password is required"),
            rememberPassword: Yup.boolean(),
        }),
        onSubmit: async (values: FormValues) => {
            await userLogin({
                email: values.email,
                password: values.password
            });
        }
    });


    return (
        <form
            onSubmit={formik.handleSubmit}
            className="w-full p-4 flex flex-col gap-10 justify-center"
        >
            <AuthHeading
                title='Sign in to Admin Account'
            />
            <div className="w-full flex flex-col gap-4 pr-10">
                <GlobalInput
                    name='email'
                    label='Email Address'
                    placeholder='Enter your email address'
                    type='email'
                    required
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    isError={formik.errors.email}
                    error={formik.errors.email}
                />
                <GlobalInput
                    name='password'
                    label='Password'
                    placeholder='Enter your password'
                    type='password'
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isError={formik.errors.password}
                    error={formik.errors.password}
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
                    type='submit'
                    setStatus={() => setStatus}
                    status={'verifyEmail'}
                    onClick={formik.submitForm}
                />
            </div>
        </form>
    )
}

export default Signin