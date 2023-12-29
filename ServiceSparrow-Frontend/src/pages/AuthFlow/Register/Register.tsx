import React, { useState } from 'react'
import TopRight from '../../../components/TopRight'
import { CenterContent, Container, ErrorText, HeadingTop, Position, PositionCol, SubContainer } from '../AuthStyles'
import Input from '../../../components/Input'
import { Grid } from '@mui/material'
import PasswordInput from '../../../components/PasswordInput'
import Button from '../../../components/Button'
import useMediaQuery from '../../../hooks/MediaQuery'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom'
import ButtonComp from '../../../components/Button'
import Myuser from '../../../store/AuthStates'
import { observer } from 'mobx-react-lite'
import {SignUpToAccount } from '../../../api'
import Toast from '../../../components/Toastifycom'
import { notifySuccess, notifyError } from '../../../components/Toastifycom'
import Loadercom from '../../../components/Loadercom'
import Swal from 'sweetalert2'
import { truncate } from 'fs'

const Register = () => {
    const [load, setLoad] = useState(false)
    const navigate = useNavigate()
    const isMobile = useMediaQuery('(min-width: 950px)');
    const initialValues = {
        email: '',
        password: '',
        confirmpass: '',
        fname: '',
        lname: ''


    }
    const validationSchema = Yup.object({


        email: Yup.string()
            .email('Enter a valid email')
            .required('Email is required'),
        password: Yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        confirmpass: Yup.string().required("Confirm Password is Required").oneOf([Yup.ref('password'), null], 'Passwords must match'),

        fname: Yup.string().min(3).required('First Name is Required'),
        lname: Yup.string().min(3).required('Last Name is Required'),
    });
    const { values, errors, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('values', values)
            Myuser.setEmail(values.email)
            Myuser.setFirstname(values.fname)
            Myuser.setLastname(values.lname)
            Myuser.setPassword(values.password)
            Myuser.setconfirmpassword(values.confirmpass)
            setLoad(true)
            SignUpToAccount(values.fname,values.lname,values.email,values.password).then(e=>{
                setLoad(false)
                if(e.status == false)
                {
                notifyError(e.message)

                }
                else{
                    Swal.fire({
                        title: 'Account Created Successfully!',
                        text: 'Please Check your Email you will receive 4-digit OTP code Please Verify it, Thank you!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                      }).then((result) => {
                        if (result.isConfirmed) {
                        navigate(`/otpcode?email=${values.email}`)
                        }
                      });
                }
            }).catch((err)=>{
                notifyError("Network Error Detected")
            })
           
            // setLoad(true)
            // RegisterUser(values).then((e) => {
            //     if (e.status === false) {
            //         notifyError(e.message)
            //         setLoad(false)
            //     } else {
            //         notifySuccess("Signup Successfully")
            //         setLoad(false)
            //         setTimeout(() => {

            //             navigate("/login")
            //         }, 2000)
            //     }
            // })

            // navigate("/")


        },
    });
    return (
        <Container>     
            <SubContainer>         
                <CenterContent>
                    <HeadingTop>Sign up</HeadingTop>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginTop: 10 }}>
                            <Input id={'email'} width={'100%'} label='Email address' value={values.email} onChange={handleChange} placeholder='MaxMustermann@gmail.com'  />
                            <ErrorText>{errors.email}</ErrorText>

                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Grid item>
                                    <Input id={'fname'} width={'98%'} label='First Name' value={values.fname} onChange={handleChange} placeholder='Max'  />
                                    <ErrorText>{errors.fname}</ErrorText>

                                </Grid>
                                <Grid item spacing={5}>
                                    <Input id={'lname'} width={'98%'} label='Last Name' value={values.lname} onChange={handleChange} placeholder='Mustermann' />
                                    <ErrorText>{errors.lname}</ErrorText>

                                </Grid>

                            </div>
                            <PasswordInput id={'password'} value={values.password} onChange={handleChange} label={'Password'} placeholder={'Enter your Password'} style={{ marginTop: 5 }} />
                            <ErrorText>{errors.password}</ErrorText>

                            <PasswordInput id={'confirmpass'} value={values.confirmpass} onChange={handleChange} label={'Confirm Password'} placeholder={'Enter your Password'} style={{ marginTop: 5 }} />
                            <ErrorText>{errors.confirmpass}</ErrorText>

                        </div>
                        <TopRight title='Already have an account?' title1='Sign in' onClick={() => '/Login'} to={'/Login'} />
                        <ButtonComp fontSize={'14px'}  load={load} title='Sign up' onClick={() => handleSubmit()} width={'100%'} />

                    </form>     
                </CenterContent>
                </SubContainer>
            <Toast />               
        </Container>
    )
}

export default observer(Register)
