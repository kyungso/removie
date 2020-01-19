import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from 'react-router-dom';

import styles from './Favorites.scss';
import classNames from 'classnames/bind';

import Poster from 'components/common/Poster';

const cx = classNames.bind(styles);

const Favorites = withRouter(({ location: { pathname }, favoriteMovies, favoriteTV, handleFavoriteBtn }) => {    
    const checkFavoriteMovie = pathname === "/account/favorite";
    const checkFavoriteTV = pathname === "/account/favorite/tv";

    return (
        <>
        <div className={cx('favorite-container')}>
            <div className={cx('favorite-title')}>
                <h2 className={cx('title')}>나의 즐겨찾기</h2>

                <div className={cx('favorite-tab')}>
                    <ul className={cx('tab-menu')} >
                        <li className={cx('tab-menu-items')}
                            style={{ borderBottom: checkFavoriteMovie ? `3px solid #ce3462` : `3px solid transparent` }}
                        >
                            <Link to="/account/favorite" className={cx(['flink', checkFavoriteMovie ? "" : "notActiveLink"])}
                            >영화 <span style={{ color: `#ce3462`, marginLeft: `8px` }}> {favoriteMovies.length}</span></Link>
                        </li>
                        <li className={cx('tab-menu-items')}
                            style={{ borderBottom: checkFavoriteTV ? `3px solid #ce3462` : `3px solid transparent` }}
                        >
                            <Link to="/account/favorite/tv" className={cx(['flink', checkFavoriteTV ? "" : "notActiveLink"])}
                            >TV <span style={{ color: `#ce3462`, marginLeft: `8px` }}> {favoriteTV.length}</span></Link>
                        </li>
                    </ul>
                </div>
                
            </div>

            <div className={cx('favorite-content')}>
            {checkFavoriteMovie && 
                favoriteMovies.map((movie) => (
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
                                <p>{movie.overview.length > 250 ? `${movie.overview.substring(0, 250)}...` : movie.overview}</p>
                            </div>
                            <div className={cx('actionBar')}>
                                <ul>
                                    <li>
                                        <div className={cx('favoriteButton')} onClick={() => handleFavoriteBtn(movie.id)} >
                                            <span className={cx('fa-heart glyphicon glyphicon-heart')}></span>
                                             Favorite
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))
            }
            {checkFavoriteTV && 
                favoriteTV.map((show) => (
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
                                <p>{show.overview.length > 250 ? `${show.overview.substring(0, 250)}...` : show.overview}</p>
                            </div>
                            <div className={cx('actionBar')}>
                                <ul>
                                    <li>
                                        <div className={cx('favoriteButton')} onClick={() => handleFavoriteBtn(show.id)} >
                                            <span className={cx('fa-heart glyphicon glyphicon-heart')}></span>
                                             Favorite
                                        </div>
                                    </li>
                                </ul>
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
    favoriteTV: PropTypes.array,
    handleFavoriteBtn: PropTypes.func,
};

export default Favorites;