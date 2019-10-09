import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { Link, withRouter } from 'react-router-dom';
import logo from 'lib/assets/logo.png';

const cx = classNames.bind(styles);

const Header = withRouter(({ location: { pathname }}) => {
    return (
        <header className={cx('header')}>
            <div className={cx('left-content')}>
                <ul className={cx('left-content-list')}>
                    <li>
                        <Link to="/"><img src={logo} className={cx('logo')} alt="logo"/></Link>
                    </li>
                    <li className={cx('left-content-items')}
                        style={{ borderBottom: (pathname === "/" ? `3px solid #3498db` : `3px solid transparent`),
                                color: (pathname === "/" ? `#ffffff` : `#7d7d7d`)}}
                    >
                        <Link to="/" className={cx('nav_link')}>Home</Link>
                    </li>
                    <li className={cx('left-content-items')}
                        style={{ borderBottom: (pathname === "/movie" ? `3px solid #3498db` : `3px solid transparent`),
                                color: (pathname === "/movie" ? `#ffffff` : `#7d7d7d`)}}
                    >
                        <Link to="/movie" className={cx('nav_link')}>Movies</Link>
                    </li>
                    <li className={cx('left-content-items')}
                        style={{ borderBottom: (pathname === "/tv" ? `3px solid #3498db` : `3px solid transparent`),
                                color: (pathname === "/tv" ? `#ffffff` : `#7d7d7d`)}}
                    >
                        <Link to="/tv" className={cx('nav_link')}>TV</Link>
                    </li>
                    <li className={cx('left-content-items')}
                        style={{ borderBottom: (pathname === "/search" ? `3px solid #3498db` : `3px solid transparent`),
                                color: (pathname === "/search" ? `#ffffff` : `#7d7d7d`)}}
                    >
                        <Link to="/search" className={cx('nav_link')}>Search</Link>
                    </li>
                </ul>
            </div>
            <div className={cx('right-content')}>
                <ul className={cx('right-content-list')}>
                {
                    localStorage.getItem('logged') === 'true'
                    ? (<li className={cx('account')}>
                        <Link to="/account">K</Link>
                       </li>)
                    : (<li className={cx('right-content-items')}
                        style={{ borderBottom: (pathname === "/login" ? `3px solid #3498db` : `3px solid transparent`),
                                color: (pathname === "/login" ? `#ffffff` : `#7d7d7d`)}}
                    >
                        <Link to="/login" className={cx('nav_link')}>+ Login</Link>
                    </li>)
                }
                </ul>
            </div>
        </header>
    );
});

export default Header;