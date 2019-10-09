import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import styles from './LoginPresenter.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const LoginPresenter = ({ username, password, handleSubmit, updateUsername, updatePassword, enterSubmit }) => (
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
                onChange={updateUsername}
                autoComplete="username"
            />
             <input
                className={cx('login-password')} 
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
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

LoginPresenter.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    request_token: PropTypes.string,
    logged: PropTypes.bool,
    loading: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    updateUsername: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired
};

export default LoginPresenter;