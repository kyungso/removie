import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './SearchTab.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default withRouter(({ location, movieTotalResults, tvTotalResults, collectionTotalResults, searchTerm }) => (
    <>
    {(location.pathname === "/search/movie_result" || location.pathname === "/search/tv_result" || location.pathname === "/search/collection_result") &&
    <header className={cx('searchTab-container')}>
        <ul className={cx('searchTab')}>
            <li className={cx('searchTab-item')}
                style={{ borderBottom: (location.pathname === "/search/movie_result" ? `3px solid #3498db` : `3px solid transparent`),
                color: (location.pathname === "/search/movie_result" ? `#ffffff` : `#7d7d7d`)}}
            >
                <Link to={`/search/movie_result?keyword=${searchTerm}`} className={cx('searchTab-link')}>Movies ({movieTotalResults})</Link>
            </li>
            <li className={cx('searchTab-item')} 
                style={{ borderBottom: (location.pathname === "/search/tv_result" ? `3px solid #3498db` : `3px solid transparent`),
                color: (location.pathname === "/search/tv_result" ? `#ffffff` : `#7d7d7d`)}}
            >
                <Link to={`/search/tv_result?keyword=${searchTerm}`} className={cx('searchTab-link')}>TV Shows ({tvTotalResults})</Link>
            </li>
            <li className={cx('searchTab-item')} 
                style={{ borderBottom: (location.pathname === "/search/collection_result" ? `3px solid #3498db` : `3px solid transparent`),
                color: (location.pathname === "/search/collection_result" ? `#ffffff` : `#7d7d7d`)}}
            >
                <Link to={`/search/collection_result?keyword=${searchTerm}`} className={cx('searchTab-link')}>Collections ({collectionTotalResults})</Link>
            </li>
        </ul>
    </header>
    }
    </>
));
