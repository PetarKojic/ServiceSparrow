import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { SocialLogin } from '../api';
import { notifyError } from './Toastifycom';

const clientId = "760587839763-2ke4autd2ed2rbk8q5fa4ai0adjmv2dn.apps.googleusercontent.com";

const GoogleLoginButton = ({ title }) => {
    const navigate = useNavigate();
    const [isNavigated, setIsNavigated] = useState(false);

    const onSuccess = (response) => {
        console.log("Login success current user", response.profileObj);
        SocialLogin(response.profileObj.givenName,response.profileObj.familyName,response.profileObj.email).then(e=>{
            if(e.status == true)
            {

                  
                    localStorage.setItem('userId', e.user._id);
                    navigate('/');
               
            }
            else{
                notifyError(e.message)
            }
        })
    };

    const onFailure = (response) => {
        console.log("Login failed", response);
        alert('Login Failed');
    };

    return (
        <GoogleLogin
            clientId={clientId}
            buttonText={title}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            // isSignedIn={true}
        />
    );
};

export default GoogleLoginButton;
