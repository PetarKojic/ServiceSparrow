import React, { useEffect, useState } from 'react'
import TopRight from '../../../components/TopRight'
import { CenterContent, Container, ErrorText, ForgetPass, HeadingTop, Position, PositionBetween, PositionCol, SubContainer } from '../AuthStyles'
import Input from '../../../components/Input'
import PasswordInput from '../../../components/PasswordInput'
import Button from '../../../components/Button'
import { useNavigate } from 'react-router-dom'
import useMediaQuery from '../../../hooks/MediaQuery'
import { useFormik } from 'formik'
import * as Yup from "yup";
import Myuser from '../../../store/AuthStates'
import { observer } from 'mobx-react-lite'
import { LoginToAccount } from '../../../api'
import Toast from '../../../components/Toastifycom'
import { notifySuccess, notifyError } from '../../../components/Toastifycom'
import Loadercom from '../../../components/Loadercom'
import Logo from '../../../Assets/Images/Logo.png'
import {gapi} from 'gapi-script'
import GoogleLoginButton from '../../../components/SocialLogin'
const clientId = "760587839763-2ke4autd2ed2rbk8q5fa4ai0adjmv2dn.apps.googleusercontent.com"

const Login = () => {
    const navigate = useNavigate()
    const isMobile = useMediaQuery('(min-width: 950px)');
    const [load, setLoad] = useState(false)

    // useEffect(() => {
    //     function start() {
    //         try {
    //             gapi.client.init({
    //                 clientId: clientId,
    //                 scope: "https://www.googleapis.com/auth/userinfo.profile"
    //             });
    //         } catch (error) {
    //             console.error("Error initializing gapi.client:", error);
    //         }
    //     }
    
    //     try {
    //         gapi.load('client:auth2', start);
    //     } catch (error) {
    //         console.error("Error loading client:auth2:", error);
    //     }
    //     }, []);
    
    const initialValues = {
        email: '',
        password: '',


    }
    const validationSchema = Yup.object({


        email: Yup.string()
            .email('Enter a valid email')
            .required('Email is required'),
        password: Yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
    });
    const { values, errors, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('values', values)
            Myuser.setEmail(values.email)
            Myuser.setPassword(values.password)
            setLoad(true)
            LoginToAccount(Myuser.email,Myuser.password).then(e=>{
                setLoad(false)
                console.log(e)
                if(e.status == false)
                {
                    notifyError(e.message)
                }
                else if(e.user.status == false)
                {
                    notifyError("Account not verified. Please verify to login.")
                }
                else{
                    localStorage.setItem('userId', e.user._id);
                    navigate("/")
                }
            }).catch(err=>{
                setLoad(false)
                notifyError("Network error detected.")

            })
           

        },
    });

    return (
        <Container>
            <SubContainer>
                {/* <div style={{backgroundColor:'black'}}>
                <img src={Logo}/>
                </div> */}
                <CenterContent>
                    <HeadingTop>Sign in</HeadingTop>
                    <form onSubmit={handleSubmit}>

                        <div style={{ marginTop: 10 }}>
                            <Input id={'email'} width={'100%'} label='Email address' value={values.email} onChange={handleChange} placeholder='maxMustermann01@gmail.com' />
                            <ErrorText>{errors.email}</ErrorText>
                            <PasswordInput id={'password'} value={values.password} onChange={handleChange} label={'Password'} placeholder={'Enter your Password'} style={{ marginTop: 5 }} />
                            <ErrorText>{errors.password}</ErrorText>

                        </div>
                        <PositionBetween>
                            <ForgetPass onClick={() => navigate('/forgetEmail')}>Forget Password?</ForgetPass>
                        </PositionBetween>
                        <PositionBetween>
                            <ForgetPass onClick={() => navigate('/verify-account')}>Verify Account?</ForgetPass>
                        </PositionBetween>

                        <Button fontSize={'14px'} load={load} style={{ padding: '2%' }} onSubmit={handleSubmit} title='Sign in' onClick={() => handleSubmit()} width={'100%'} />
                        <div style={{marginTop:'4%'}}>
                        <TopRight title='New User?' title1='Create an account' onClick={() => '/register'} to={'/register'} />
                        </div>
                    </form>
                    <GoogleLoginButton title={'Sign in with Google'}/>
                </CenterContent>
            </SubContainer>
            <Toast />

        </Container>
    )
}

export default observer(Login)
