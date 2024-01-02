import React, { useState } from 'react'

import { CenterContent, Container, ErrorText, HeadingTop, Position, PositionCol, SubContainer, SubHeading } from '../AuthStyles'

import Input from '../../../components/Input'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useMediaQuery from '../../../hooks/MediaQuery'
import { useFormik } from 'formik'
import * as Yup from "yup";
import ButtonComp from '../../../components/Button'
import Myuser from '../../../store/AuthStates'
import { observer } from 'mobx-react-lite'
import {GetOTPAccount } from '../../../api'
import BottomLink from '../../../components/BottomLink'
import { notifyError, notifySuccess } from '../../../components/Toastifycom'


const OtpScreenEmail = () => {
    const navigate = useNavigate()

    const [load, setLoad] = useState(false)
    const isMobile = useMediaQuery('(min-width: 950px)');

    const initialValues = {
        email: '',


    }
    const validationSchema = Yup.object({


        email: Yup.string()
            .email('Enter a valid email')
            .required('Email is required'),
      
    });
    const { values, errors, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('values', values)
            setLoad(true)
            GetOTPAccount(values.email).then(e=>{
                setLoad(false)
                if(e.status == true)
                {
                    notifySuccess(e.message)
                    navigate(`/otpcode?email=${values.email}`)
                }
                else{
                    notifyError(e.message)
                }
            }).catch(err=>{
                notifyError("Network Error Detected.")
            })
            // Myuser.setEmail(values.email)
            // ForgetEmailNew(values).then((e) => {
            //     if(e.status === false){
            //         alert(e.message)
            //     }else{
            //         alert(e.message)
            //         setTimeout(() => {

            //             navigate("/")
            //         }, 2000)
            //     }
            // })
            // navigate("/Forget-Password")

        },
    });

    return (
        <Container>
            <SubContainer>
                <CenterContent>
                    <HeadingTop>Verify Account?</HeadingTop>
                    <SubHeading>No worries! Just enter your email and we’ll send you a new OTP.</SubHeading>
                    <form onSubmit={handleSubmit}>
                    <div style={{ marginTop: 10 }}>
                        <Input id={'email'} width={'100%'} label='Email address' value={values.email} onChange={handleChange} placeholder='Johndoe11gmail.com'  />
                         <ErrorText>{errors.email}</ErrorText>
                    </div>
                    <ButtonComp load={load} fontSize={'14px'} title='Send OTP' onClick={() => ''} width={'100%'} />
                    </form>
                    <BottomLink title='Just remember?' title1='Sign in' onClick={() => '/login'} to='/login' />
                </CenterContent>
                </SubContainer>
        </Container>
    )
}

export default observer(OtpScreenEmail) 
