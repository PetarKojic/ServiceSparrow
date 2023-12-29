import React, { useState } from 'react'

import { CenterContent, Container, ErrorText, HeadingTop, Position, PositionCol, SubContainer, SubHeading } from '../AuthStyles'
import { useLocation, useNavigate } from 'react-router-dom'
import useMediaQuery from '../../../hooks/MediaQuery'
import ButtonComp from '../../../components/Button'
import BottomLink from '../../../components/BottomLink'
import { MuiOtpInput } from 'mui-one-time-password-input'
import styled from 'styled-components'
import { VerifyOTPAccount } from '../../../api'
import { notifyError, notifySuccess } from '../../../components/Toastifycom'

const MuiOtpInputStyled = styled(MuiOtpInput)`
  display: flex;
  gap: 30px;
  max-width: 500px;
  margin-inline: auto;
`

const OtpcodeScreen = () => {
    const navigate = useNavigate()
    const isMobile = useMediaQuery('(min-width: 950px)');
    const [otp, setOtp] = React.useState('')
    const [load , setLoad] = useState(false)
// const location  = useLocation()
// const path = location.pathname.split("?")
const getParameterByName = new URLSearchParams(window.location.search)   
// const mode = getParameterByName.get("mode")   
const email = getParameterByName.get('email');
console.log(email)
if(email == null)
{
    navigate("/login")
}


    const handleChange = (newValue: any) => {
        setOtp(newValue)
       
    }
    const handleSubmit = () => {
        setLoad(true)
        VerifyOTPAccount(email,otp).then(e=>{
            setLoad(false)
            if(e.status == false)
            {
                notifyError(e.message)
                
            }
            else{
                notifySuccess(e.message)
                navigate("/login")
            }
        }).catch(err=>{
            setLoad(false)
            notifyError("Network Error Detected.")
        })
    }


    return (
        <Container>
            <SubContainer>
                <CenterContent>
                    <HeadingTop>OTP code </HeadingTop>
                    <SubHeading>Enter 4-digit OTP code that you have received on your Email !</SubHeading>
                    <MuiOtpInputStyled value={otp} onChange={handleChange} autoFocus />
                    <div style={{ marginTop: '10%' }}>
                        <ButtonComp load={load} onSubmit={handleSubmit} fontSize={'14px'} title='Submit' onClick={() => handleSubmit()} width={'100%'} />
                    </div>
                    <BottomLink title='Not Received?' title1='Send Again' onClick={() => navigate("/verify-account")} to='/verify-account' />

                </CenterContent>
            </SubContainer>
        </Container>
    )
}

export default OtpcodeScreen
