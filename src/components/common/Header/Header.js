import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { Link, withRouter } from 'react-router-dom';
import logo from 'lib/assets/logo.png';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const cx = classNames.bind(styles);

const Header = withRouter(({ location: { pathname }, handleLogout, username }) => {
    return (
        <header className={cx('header')}>
            <div className={cx('left-content')}>
                <ul className={cx('left-content-list')}>
                    <li>
                        <Link to="/"><img src={logo} className={cx('logo')} alt="logo"/></Link>
                    </li>
                    <li className={cx('left-content-items')}
                        style={{ borderBottom: (pathname === "/" ? `3px solid #3498db` : `3px solid transparent`) }}
                    >
                        <Link to="/" className={cx('nav_link')} 
                            style={{ color: (pathname === "/" ? `#ffffff` : `#7d7d7d`) }}
                        >Home</Link>
                    </li>
                    <li className={cx('left-content-items')}
                        style={{ borderBottom: (pathname === "/movie" ? `3px solid #3498db` : `3px solid transparent`) }}
                    >
                        <Link to="/movie" className={cx('nav_link')}
                            style={{ color: (pathname === "/movie" ? `#ffffff` : `#7d7d7d`) }}
                        >Movies</Link>
                    </li>
                    <li className={cx('left-content-items')}
                        style={{ borderBottom: (pathname === "/tv" ? `3px solid #3498db` : `3px solid transparent`) }}
                    >
                        <Link to="/tv" className={cx('nav_link')}
                            style={{ color: (pathname === "/tv" ? `#ffffff` : `#7d7d7d`) }}
                        >TV</Link>
                    </li>
                    <li className={cx('left-content-items')}
                        style={{ borderBottom: (pathname === "/search" ? `3px solid #3498db` : `3px solid transparent`) }}
                    >
                        <Link to="/search" className={cx('nav_link')}
                            style={{ color: (pathname === "/search" ? `#ffffff` : `#7d7d7d`) }}
                        >Search</Link>
                    </li>
                </ul>
            </div>
            <div className={cx('right-content')}>
                <ul className={cx('right-content-list')}>
                {
                    localStorage.getItem('logged') === 'true' && localStorage.getItem('session_id') !== null
                    ? (<li>
                        <DropdownButton id="dropdown-item-button" title={username.substring(0,1).toUpperCase()}>
                            <Dropdown.Item href="#/account">{username}</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </DropdownButton>
                       </li>)
                    : (<li className={cx('right-content-items')}
                        style={{ borderBottom: (pathname === "/login" ? `3px solid #3498db` : `3px solid transparent`) }}
                    >
                        <Link to="/login" className={cx('nav_link')}
                            style={{ color: (pathname === "/login" ? `#ffffff` : `#7d7d7d`) }}
                        >+ Login</Link>
                    </li>)
                }
                </ul>
            </div>
        </header>
    );
});

export default Header;