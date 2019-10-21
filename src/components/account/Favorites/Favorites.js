import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from 'react-router-dom';

import styles from './Favorites.scss';
import classNames from 'classnames/bind';

import Poster from 'components/common/Poster';

const cx = classNames.bind(styles);

const Favorites = withRouter(({ location: { pathname }, favoriteMovies }) => { 
    console.log(favoriteMovies);   
    return (
        <>
        <div className={cx('favorite-container')}>
            <div className={cx('favorite-title')}>
                <h2 className={cx('title')}>My Favorites</h2>

                <div className={cx('favorite-tab')}>
                    <ul className={cx('tab-menu')} >
                        <li className={cx('tab-menu-items')}
                            style={{ borderBottom: (pathname === "/favorites" ? `3px solid #ce3462` : `3px solid transparent`) }}
                        >
                            <Link to="/favorites" className={cx('flink')}
                                style={{ color: (pathname === "/favorites" ? `#ffffff` : `#AAAAAA`) }}
                            >Movies <span style={{ color: `#ce3462`, marginLeft: `8px` }}> {favoriteMovies.length}</span></Link>
                        </li>
                        <li className={cx('tab-menu-items')}>
                            <Link to="/favorites/tv" className={cx('flink')}
                                style={{ color: (pathname === "favorites/tv" ? `#ffffff` : `#AAAAAA`) }}
                            >TV</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={cx('favorite-content')}>
                {favoriteMovies.map(movie => (
                    <div className={cx('favorite-items')} key={movie.id}>
                        <Poster
                            key={movie.id}
                            id={movie.id}
                            imageUrl={movie.poster_path}
                            title={movie.title}
                            rating={movie.vote_average}
                            year={movie.release_date ? movie.release_date.substring(0, 4) : ''}
                            isMovie={true}
                        />
                        <div className={cx('poster-content')}>
                            <div className={cx('titleSection')}>
                                <Link to={`/movie/${movie.id}`} className={cx('movieTitle')}>{movie.title}</Link>
                                <span className={cx('releaseDate')}>({movie.release_date ? movie.release_date.substring(5, 7) + ", " + movie.release_date.substring(0, 4) : ''})</span>
                            </div>
                            <div className={cx('mOverview')}>
                                <p>{movie.overview}</p>
                            </div>
                            <div className={cx('actionBar')}>
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
});

Favorites.propTypes = {
    favoriteMovies: PropTypes.array,
};

export default Favorites;