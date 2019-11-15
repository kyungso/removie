import React from 'react';
import { Redirect } from "react-router-dom";
import LoginContainer from 'containers/LoginContainer';

const LoginPage = () => {
    let session_id = localStorage.getItem('session_id');
    return (
        <>
        { session_id 
            ? <Redirect to="/" />
            : <LoginContainer/>
        }
        </>
    );
};

export default LoginPage;