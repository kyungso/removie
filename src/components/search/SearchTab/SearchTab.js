import React from 'react';
import PropTypes from "prop-types";
import { Link, withRouter } from 'react-router-dom';

import styles from './SearchTab.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SearchTab = withRouter(({ location: { pathname }, movieTotalResults, tvTotalResults, collectionTotalResults, searchTerm }) => (
    <>
    {(pathname === "/search/movie_result" || pathname === "/search/tv_result" || pathname === "/search/collection_result") &&
    <header className={cx('searchTab-container')}>
        <ul className={cx('searchTab')}>
            <li className={cx('searchTab-item')}
                style={{ borderBottom: (pathname === "/search/movie_result" ? `3px solid #3498db` : `3px solid transparent`),
                color: (pathname === "/search/movie_result" ? `#ffffff` : `#7d7d7d`)}}
            >
                <Link to={`/search/movie_result?keyword=${searchTerm}`} className={cx('searchTab-link')}>Movies ({movieTotalResults})</Link>
            </li>
            <li className={cx('searchTab-item')} 
                style={{ borderBottom: (pathname === "/search/tv_result" ? `3px solid #3498db` : `3px solid transparent`),
                color: (pathname === "/search/tv_result" ? `#ffffff` : `#7d7d7d`)}}
            >
                <Link to={`/search/tv_result?keyword=${searchTerm}`} className={cx('searchTab-link')}>TV Shows ({tvTotalResults})</Link>
            </li>
            <li className={cx('searchTab-item')} 
                style={{ borderBottom: (pathname === "/search/collection_result" ? `3px solid #3498db` : `3px solid transparent`),
                color: (pathname === "/search/collection_result" ? `#ffffff` : `#7d7d7d`)}}
            >
                <Link to={`/search/collection_result?keyword=${searchTerm}`} className={cx('searchTab-link')}>Collections ({collectionTotalResults})</Link>
            </li>
        </ul>
    </header>
    }
    </>
));

SearchTab.propTypes = {
    movieTotalResults: PropTypes.number,
    tvTotalResults: PropTypes.number,
    collectionTotalResults: PropTypes.number,
    searchTerm: PropTypes.string,
};

export default SearchTab;