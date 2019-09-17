import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { Link, withRouter } from 'react-router-dom';
import logo from 'lib/assets/logo.png';

const cx = classNames.bind(styles);

const Header = withRouter(({ location: { pathname }}) => {
    return (
        <header className={cx('header')}>
            
            <ul className={cx('header-list')}>
                <li>
                    <Link to="/"><img src={logo} className={cx('logo')} alt="logo"/></Link>
                </li>
                <li className={cx('header-items')}
                    style={{ borderBottom: (pathname === "/" ? `3px solid #3498db` : `3px solid transparent`),
                             color: (pathname === "/" ? `#ffffff` : `#7d7d7d`)}}
                >
                    <Link to="/" className={cx('nav_link')}>Home</Link>
                </li>
                <li className={cx('header-items')}
                    style={{ borderBottom: (pathname === "/movie" ? `3px solid #3498db` : `3px solid transparent`),
                             color: (pathname === "/movie" ? `#ffffff` : `#7d7d7d`)}}
                >
                    <Link to="/movie" className={cx('nav_link')}>Movies</Link>
                </li>
                <li className={cx('header-items')}
                    style={{ borderBottom: (pathname === "/tv" ? `3px solid #3498db` : `3px solid transparent`),
                             color: (pathname === "/tv" ? `#ffffff` : `#7d7d7d`)}}
                >
                    <Link to="/tv" className={cx('nav_link')}>TV</Link>
                </li>
                <li className={cx('header-items')}
                    style={{ borderBottom: (pathname === "/search" ? `3px solid #3498db` : `3px solid transparent`),
                             color: (pathname === "/search" ? `#ffffff` : `#7d7d7d`)}}
                >
                    <Link to="/search" className={cx('nav_link')}>Search</Link>
                </li>
            </ul>
        </header>
    );
});

export default Header;