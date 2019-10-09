import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import styles from './AccountPresenter.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AccountPresenter = ({ handleLogout }) => (
    <div className={cx('account-container')}>
        <Helmet>
            <title>REMOVIE</title>
        </Helmet>
        내 계정이댜아~~
        <button
                className={cx('logout-button')}
                type="button"
                onClick={handleLogout}
        >Logout</button>
    </div>
);

AccountPresenter.propTypes = {
    session_id: PropTypes.string,
    logged: PropTypes.bool,
    loading: PropTypes.bool,
};

export default AccountPresenter;