import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import styles from './LoginPresenter.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const LoginPresenter = ({ username, password, inputFocus, handleSubmit, updateField, enterSubmit }) => {
  const idRef = useRef(null);
  
  useEffect(() => {
    idRef.current.focus();
  },[]);

  useEffect(() => {
      if(inputFocus){
        idRef.current.focus();
      }
  },[inputFocus]);

  return(
    <div className={cx('login-container')}>
        <Helmet>
            <title>Login | REMOVIE</title>
        </Helmet>
         <h2>Login to your account of TMDB</h2>
         <p>In order to user this app, you must have your account of TMDB.</p>
         <p>If you do not have an account, registering for account is free and simple. <a href="https://www.themoviedb.org/account/signup">Click here</a> to get started.</p>
         <form className={cx('login-form')}>
            <input
                className={cx('login-username')} 
                placeholder="Username"
                value={username}
                onChange={(e) => updateField({ key: 'username', value: e.target.value })}
                autoComplete="username"
                ref={idRef}
            />
             <input
                className={cx('login-password')} 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => updateField({ key: 'password', value: e.target.value })}
                onKeyUp={enterSubmit}
                autoComplete="current-password"
            />
            <input
                className={cx('login-button')}
                type="button"
                value="Login"
                onClick={handleSubmit}
            />
        </form>
    </div>
  );
};

LoginPresenter.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    inputFocus: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    updateField: PropTypes.func.isRequired,
    enterSubmit: PropTypes.func
};

export default LoginPresenter;