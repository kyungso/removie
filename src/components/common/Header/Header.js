import React, { useState, useRef, useEffect } from 'react';
import PropTypes from "prop-types";
import { Link, withRouter } from 'react-router-dom';

import styles from './Header.scss';
import classNames from 'classnames/bind';

import logo from 'lib/assets/logo.png';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const cx = classNames.bind(styles);

const Header = withRouter(({ location: { pathname }, handleLogout }) => {
    const [handleScroll, setHandleScroll] = useState("");
    const [searchFocus, setSearchFocus] = useState(false);
    const homeRef = useRef(null);
    const movieRef = useRef(null);
    const tvRef = useRef(null);
    const loginRef = useRef(null);
    const searchRef = useRef(null);
    let username = localStorage.getItem('username');
     
    useEffect(() => {
        window.addEventListener('scroll', () => setHandleScroll(window.scrollY > 80 ? "black" : ""));
    },[]);

    useEffect(() => {
        if(pathname === "/") {
            homeRef.current.classList.remove("notActive");
            movieRef.current.classList.add("notActive");
            tvRef.current.classList.add("notActive");
            localStorage.getItem('logged') === 'false' && loginRef.current.classList.add("notActive");
        } else if(pathname === "/movie") {
            movieRef.current.classList.remove("notActive");
            homeRef.current.classList.add("notActive");
            tvRef.current.classList.add("notActive");
            localStorage.getItem('logged') === 'false' && loginRef.current.classList.add("notActive");
        } else if(pathname === "/tv") {
            tvRef.current.classList.remove("notActive");
            homeRef.current.classList.add("notActive");
            movieRef.current.classList.add("notActive");
            localStorage.getItem('logged') === 'false' && loginRef.current.classList.add("notActive");
        } else if(pathname === "/login") {
            loginRef.current.classList.remove("notActive");
            homeRef.current.classList.add("notActive");
            movieRef.current.classList.add("notActive");
            tvRef.current.classList.add("notActive");
        }
    }, [pathname]);

    useEffect(() => {
        if(searchFocus) {
            searchRef.current.focus();
        }
    }, [searchFocus]);

    return (
        <header className={cx(['header', handleScroll])}>
            <div className={cx('left-content')}>
                <ul className={cx('left-content-list')}>
                    <li>
                        <Link to="/"><img src={logo} className={cx('logo')} alt="logo"/></Link>
                    </li>
                    <li className={cx('left-content-items')}>
                        <Link to="/" className={cx('nav_link')} 
                            ref={homeRef}
                        >홈</Link>
                    </li>
                    <li className={cx('left-content-items')}>
                        <Link to="/movie" className={cx('nav_link')} 
                              ref={movieRef}
                        >영화</Link>
                    </li>
                    <li className={cx('left-content-items')}>
                        <Link to="/tv" className={cx('nav_link')}
                              ref={tvRef}
                        >TV 프로그램</Link>
                    </li>
                    {/* <li className={cx('left-content-items')}
                        style={{ borderBottom: (pathname.includes("/search") ? `3px solid #3498db` : `3px solid transparent`) }}
                    >
                        <Link to="/search" className={cx('nav_link')}
                            style={{ color: (pathname.includes("/search") ? `#ffffff` : `#7d7d7d`) }}
                        >Search</Link>
                    </li> */}
                </ul>
            </div>
            <div className={cx('right-content')}>
                <ul className={cx('right-content-list')}>
                    <li className={cx('right-item')}>
                      <div id="custom-search" onClick={() => setSearchFocus(!searchFocus)}>
                        <input type="text" ref={searchRef} className={cx('search-query')} placeholder="Movies, TV Shows, Collections" />
                        <button type="button">
                          <span className={cx('icon-search')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.83 93.83"><path d="M39,3.17a36,36,0,0,0,0,72A35.69,35.69,0,0,0,59.36,68.8L85.64,95.08a6.55,6.55,0,0,0,9.27-9.24L68.63,59.56A36,36,0,0,0,39,3.17Zm0,13.09A22.91,22.91,0,1,1,16.09,39.17,22.81,22.81,0,0,1,39,16.26Z" transform="translate(-3 -3.17)"/></svg>
                          </span>
                        </button>
                        <input type="submit" value="Submit" style={{ display: 'none' }} />
                      </div>
                    </li>
                {
                    localStorage.getItem('logged') === 'true' && localStorage.getItem('session_id') !== null
                    ? (<li className={cx('right-item')}>
                        <DropdownButton id="dropdown-item-button" title={username.substring(0,1).toUpperCase()}>
                            <Dropdown.Item href="#/account">{username}<p className={cx('subAccount')}>View profile</p></Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#/account/favorite">Favorites</Dropdown.Item>
                            <Dropdown.Item href="#/account/rating">Ratings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </DropdownButton>
                       </li>)
                    : (<li className={cx(['right-content-items','right-item'])}>
                        <Link to="/login" className={cx('nav_link')}
                              ref={loginRef}
                        >로그인</Link>
                    </li>)
                }
                </ul>
            </div>
        </header>
    );
});

Header.propTypes = {
    handleLogout: PropTypes.func,
};

export default Header;