import React, { useEffect, useState } from 'react'
import { CenterContent, Container, ErrorText, HeadingTop, Position, PositionCol, SubContainer, SubHeading } from '../AuthStyles'

import PasswordInput from '../../../components/PasswordInput'

import useMediaQuery from '../../../hooks/MediaQuery'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ButtonComp from '../../../components/Button'
import Myuser from '../../../store/AuthStates'
import { observer } from 'mobx-react-lite'
import { ActivateForgetPasswordAccount, ResetPasswordAccount } from '../../../api'
import { notifyError, notifySuccess } from '../../../components/Toastifycom'


const ForgetPassword = () => {
    const navigate = useNavigate()
    const [load , setLoad] = useState(false)
    const isMobile = useMediaQuery('(min-width: 950px)');
    const initialValues = {

        password: '',
        confirmpass: '',

    }
    const validationSchema = Yup.object({



        password: Yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        confirmpass: Yup.string().required("Confirm Password is Required").oneOf([Yup.ref('password'), null], 'Passwords must match'),

    });
    const location = useLocation()
    const getParameterByName = new URLSearchParams(window.location.search)   
// const mode = getParameterByName.get("mode")   


const email = getParameterByName.get('ID');
alert(email)
useEffect(() => {
    
        if (email === undefined) {
            setTimeout(() => {

                navigate("/")
            }, 2000)

        } else {
            ActivateForgetPasswordAccount(email).then((e) => {
                if (e.status === false) {
                    alert(e.message)
                    setTimeout(() => {

                        navigate("/")
                    }, 2000)

                }
            })
        }
    }, [])
    const { values, errors, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoad(true)
            Myuser.setPassword(values.password)
            Myuser.setconfirmpassword(values.confirmpass)
            // navigate("/")
            ResetPasswordAccount(email,values.password).then(e=>{
                setLoad(false)
                if(e.status == false)
                {
                    notifyError(e.message)
                }
                else{
                    notifySuccess(e.message)
                }
            }).catch(err=>{
                setLoad(false)
                notifyError("Network Error Detected.")
            })
            // ResetPasswordNew(path[1].split("=")[1], values).then((e) => {
            //     if (e.status === false) {
            //         alert(e.message)
            //     } else {
            //         alert(e.message)
            //         setTimeout(() => {

            //             navigate("/")
            //         }, 2000)
            //     }
            // })

        },
    });
    return (
        <Container>
            <SubContainer>
                <CenterContent>
                    <HeadingTop>Create new password</HeadingTop>
                    <SubHeading>Please create a new password that you don’t use on any other site.</SubHeading>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginTop: 10 }}>
                            <PasswordInput id={'password'} value={values.password} onChange={handleChange} label={'Password'} placeholder={'Enter your Password'} style={{ marginTop: 5 }} />
                            <ErrorText>{errors.password}</ErrorText>
                            <PasswordInput id={'confirmpass'} value={values.confirmpass} onChange={handleChange} label={'Confirm Password'} placeholder={'Enter your Password'} style={{ marginTop: 5 }} />
                            <ErrorText>{errors.confirmpass}</ErrorText>

                        </div>
                        <div style={{ marginTop: '10%' }}>
                            <ButtonComp load={load} fontSize={'14px'} title='Change Password' onClick={() => ''} width={'100%'} />
                        </div>
                    </form>
                </CenterContent>
            </SubContainer>
        </Container>
    )
}

export default observer(ForgetPassword) 
