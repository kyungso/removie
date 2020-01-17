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
            <title>로그인 | REMOVIE</title>
        </Helmet>
        <div className={cx('login-wrapper')}>
         <div>
           <h2>로그인</h2>
         </div>
         <form className={cx('login-form')}>
           <div className={cx('username-wrapper')}>
            <input
                className={cx('login-username')} 
                placeholder="아이디"
                value={username}
                onChange={(e) => updateField({ key: 'username', value: e.target.value })}
                autoComplete="username"
                ref={idRef}
            />
            </div>
            <div className={cx('password-wrapper')}>
             <input
                className={cx('login-password')} 
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => updateField({ key: 'password', value: e.target.value })}
                onKeyUp={enterSubmit}
                autoComplete="current-password"
            />
           </div>
            <input
                className={cx('login-button')}
                type="button"
                value="로그인"
                onClick={handleSubmit}
            />
        </form>
        <p>계정이 없으신가요?  <a href="https://www.themoviedb.org/account/signup"> 가입하기</a></p>
        <input
                className={cx('login-button')}
                type="button"
                value="구글로 로그인"
                onClick={handleSubmit}
                style={{ borderColor: `rgb(200,200,200)`, backgroundColor: `rgb(255,255,255)`, color: `black`}}
        />
       </div>
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