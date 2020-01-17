import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import styles from './Header.scss';
import classNames from 'classnames/bind';

import logo from 'lib/assets/logo.png';
import SearchIcon from 'components/search/SearchIcon';
import SearchDeleteIcon from 'components/search/SearchDeleteIcon';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const cx = classNames.bind(styles);

const Header = ({ location, history, handleLogout, initializeSearchTerm, searchTerm, searchUpdateTerm }) => {
    const [handleScroll, setHandleScroll] = useState("");
    const [searchFocus, setSearchFocus] = useState(false);
    const [query, setQuery] = useState("");
    const [loginHeader, setLoginHeader] = useState("");
    const searchContainerRef = useRef(null);
    const searchRef = useRef(null);
    const deleteSearchRef = useRef(null);
    let username = localStorage.getItem('username');

    useEffect(() => {
        window.addEventListener('scroll', () => setHandleScroll(window.scrollY > 70 ? "black" : ""));
    },[]);

    const handleSearchClick = () => {
       setSearchFocus(!searchFocus);
    };
    const handleOutsideClick = useCallback((e) => {
        if(searchFocus 
            && !searchContainerRef.current.contains(e.target)
        ) {
            if(searchRef.current !== null && !searchRef.current.value) {
                setSearchFocus(!searchFocus);
            } 
        }

        if(deleteSearchRef.current !== null && deleteSearchRef.current.contains(e.target)) {
            history.push('/');
            initializeSearchTerm();
            setSearchFocus(true);
        }
    }, [searchFocus, initializeSearchTerm, history]);
    useEffect(() => {
        window.addEventListener('click', handleOutsideClick);
        return () => window.removeEventListener('click', handleOutsideClick);
    },[handleOutsideClick]);

    useEffect(() => {
        setLoginHeader(location.pathname === "/login" ? "displayNone" : "");

        if(location.pathname !== "/search") {
            setSearchFocus(false);
            setQuery("");
        }

    }, [location.pathname, loginHeader]);

    useEffect(() => {
        let q = queryString.parse(location.search).keyword; 
        if(q && q.length > 0) { // for refresh page
            setSearchFocus(true);
            setQuery(q);
            if(searchRef.current !== null && !searchRef.current.value) {
                searchRef.current.value = q;
            }
        } else if(searchFocus) {
            searchRef.current.focus();
        } else {
            initializeSearchTerm();
        }
    }, [searchFocus, initializeSearchTerm, location.search]);

    return (
        <header className={cx(['header', handleScroll])}>
            <div className={cx('left-content')}>
                <ul className={cx('left-content-list')}>
                    <li>
                        <Link to="/"><img src={logo} className={cx('logo')} alt="logo"/></Link>
                    </li>
                    <li className={cx('left-content-items', loginHeader)}>
                        <Link to="/" className={cx(['nav_link', location.pathname === "/" ? "" : "notActive"])} 
                        >홈</Link>
                    </li>
                    <li className={cx('left-content-items', loginHeader)}>
                        <Link to="/movie" className={cx(['nav_link', location.pathname === "/movie" ? "" : "notActive"])} 
                        >영화</Link>
                    </li>
                    <li className={cx('left-content-items', loginHeader)}>
                        <Link to="/tv" className={cx(['nav_link', location.pathname === "/tv" ? "" : "notActive"])}
                        >TV 프로그램</Link>
                    </li>
                </ul>
            </div>
            <div className={cx('right-content', loginHeader)}>
                <ul className={cx('right-content-list')}>
                    <li className={cx('right-item')}>
                      <div className={cx('search-nav')} 
                           ref={searchContainerRef}
                           onClick={!searchFocus ? handleSearchClick : undefined}
                           style={searchFocus ? { width: `230px` } : {}}
                      >
                        {!searchFocus && 
                          <span className={cx('search-nav-text')}>
                           <SearchIcon color='#FFFFFF'/>
                           &nbsp;&nbsp;검색
                          </span>
                        }
                        <div className={cx('clickOutside-searchInput')}>
                         <div className={cx('search-inputWrapper')}
                              style={searchFocus ? { width: `230px`, opacity: `1`, transition: `width 0.2s ease 0s, opacity 0.2s ease 0s` } : {}}
                         >
                          {searchFocus &&
                           <div className={cx('search-input')}>
                            <form>
                              <SearchIcon color='#121212'/>
                              <input
                                  ref={searchRef}
                                  type="text"
                                  className={cx('search-query')}
                                  placeholder="영화, TV 프로그램, 시리즈 검색"
                                  value={searchTerm}
                                  onChange={searchUpdateTerm}
                              />
                              {query !== "" && 
                                <span className={cx('search-delete-icon')}
                                      ref={deleteSearchRef}
                                >
                                  <SearchDeleteIcon/>
                                </span>
                              }
                            </form>
                          </div>
                         }
                         </div>
                        </div>
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
                        <Link to="/login" className={cx(['nav_link', location.pathname === "/login" ? "" : "notActive"])}
                        >로그인</Link>
                    </li>)
                }
                </ul>
            </div>
        </header>
    );
};

Header.propTypes = {
    handleLogout: PropTypes.func,
    initializeSearchTerm: PropTypes.func,
    searchTerm: PropTypes.string, 
    searchUpdateTerm: PropTypes.func
};

export default Header;