import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from 'react-router-dom';

import styles from './Favorites.scss';
import classNames from 'classnames/bind';

import Poster from 'components/common/Poster';

const cx = classNames.bind(styles);

const Favorites = withRouter(({ location: { pathname }, favoriteMovies, favoriteTV, handleMarkFavorite }) => {    
    return (
        <>
        <div className={cx('favorite-container')}>
            <div className={cx('favorite-title')}>
                <h2 className={cx('title')}>My Favorites</h2>

                <div className={cx('favorite-tab')}>
                    <ul className={cx('tab-menu')} >
                        <li className={cx('tab-menu-items')}
                            style={{ borderBottom: (pathname === "/account/favorite" ? `3px solid #ce3462` : `3px solid transparent`) }}
                        >
                            <Link to="/account/favorite" className={cx('flink')}
                                style={{ color: (pathname === "/account/favorite" ? `#ffffff` : `#AAAAAA`) }}
                            >Movies <span style={{ color: `#ce3462`, marginLeft: `8px` }}> {favoriteMovies.length}</span></Link>
                        </li>
                        <li className={cx('tab-menu-items')}
                            style={{ borderBottom: (pathname === "/account/favorite/tv" ? `3px solid #ce3462` : `3px solid transparent`) }}
                        >
                            <Link to="/account/favorite/tv" className={cx('flink')}
                                style={{ color: (pathname === "/account/favorite/tv" ? `#ffffff` : `#AAAAAA`) }}
                            >TV <span style={{ color: `#ce3462`, marginLeft: `8px` }}> {favoriteTV.length}</span></Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={cx('favorite-content')}>
            {pathname === "/account/favorite" && 
                favoriteMovies.map(movie => (
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
                                <ul>
                                    <li>
                                        <Link to={`/account/favorite?media_type=movie&media_id=${movie.id}&favorite=false`} className={cx('favoriteButton')}>
                                            <span className={cx('glyphicon glyphicon-heart')}></span>
                                             Favorite
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))
            }
            {pathname === "/account/favorite/tv" && 
                favoriteTV.map(show => (
                    <div className={cx('favorite-items')} key={show.id}>
                        <Poster
                            key={show.id}
                            id={show.id}
                            imageUrl={show.poster_path}
                            title={show.name}
                            rating={show.vote_average}
                            year={show.first_air_date ? show.first_air_date.substring(0, 4) : ''}
                            isMovie={true}
                        />
                        <div className={cx('poster-content')}>
                            <div className={cx('titleSection')}>
                                <Link to={`/show/${show.id}`} className={cx('movieTitle')}>{show.name}</Link>
                                <span className={cx('releaseDate')}>({show.first_air_date ? show.first_air_date.substring(5, 7) + ", " + show.first_air_date.substring(0, 4) : ''})</span>
                            </div>
                            <div className={cx('mOverview')}>
                                <p>{show.overview}</p>
                            </div>
                            <div className={cx('actionBar')}>
                                
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
        </>
    );
});

Favorites.propTypes = {
    favoriteMovies: PropTypes.array,
    favoriteTV: PropTypes.array
};

export default Favorites;