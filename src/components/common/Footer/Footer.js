import React from 'react';
import styles from './Footer.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import logo from 'lib/assets/logo_footer.png';

const cx = classNames.bind(styles);

const Footer = () => (
    <footer className={cx('footer')}>
        <NavLink to="/"><img src={logo} className={cx('logo')} alt="logo"/></NavLink>
        <div className={cx('copyright')}>@Copyright. All rights reserved.</div>
    </footer>
);

export default Footer;