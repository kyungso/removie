import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from 'react-router-dom';

import styles from './Rating.scss';
import classNames from 'classnames/bind';

import Poster from 'components/common/Poster';

const cx = classNames.bind(styles);

const Rating = withRouter(({ location: { pathname }, ratedMovies, ratedTV }) => {    
    return (
    <>
        <div className={cx('rating-container')}>
        
          <div className={cx('rating-title')}>
                  <h2 className={cx('Rtitle')}>My Ratings</h2>

                  <div className={cx('rating-tab')}>
                      <ul className={cx('Rtab-menu')} >
                          <li className={cx('Rtab-menu-items')}
                              style={{ borderBottom: (pathname === "/account/rating" ? `3px solid #ce3462` : `3px solid transparent`) }}
                          >
                              <Link to="/account/rating" className={cx('Rlink')}
                                  style={{ color: (pathname === "/account/rating" ? `#ffffff` : `#AAAAAA`) }}
                              >Movies <span style={{ color: `#ce3462`, marginLeft: `8px` }}> {ratedMovies.length}</span></Link>
                          </li>
                          <li className={cx('Rtab-menu-items')}
                              style={{ borderBottom: (pathname === "/account/rating/tv" ? `3px solid #ce3462` : `3px solid transparent`) }}
                          >
                              <Link to="/account/rating/tv" className={cx('Rlink')}
                                  style={{ color: (pathname === "/account/rating/tv" ? `#ffffff` : `#AAAAAA`) }}
                              >TV <span style={{ color: `#ce3462`, marginLeft: `8px` }}> {ratedTV.length}</span></Link>
                          </li>
                      </ul>
                  </div>
                  
              </div>

            <div className={cx('rating-content')}>
            {pathname === "/account/rating" && 
                ratedMovies.map(movie => (
                    <div className={cx('rating-items')} key={movie.id}>
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
                                        <Link to={`/account/rating?media_type=movie&media_id=${movie.id}&favorite=false`} className={cx('ratingButton')}>
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
            {pathname === "/account/rating/tv" && 
                ratedTV.map(show => (
                    <div className={cx('rating-items')} key={show.id}>
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

Rating.propTypes = {
    ratedMovies: PropTypes.array,
    ratedTV: PropTypes.array
};

export default Rating;