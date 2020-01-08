import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from 'react-router-dom';

import styles from './Rating.scss';
import classNames from 'classnames/bind';

import { Tooltip, OverlayTrigger } from 'react-bootstrap';

import Poster from 'components/common/Poster';
import StarRating from 'components/StarRating';

const cx = classNames.bind(styles);

//** for date
let date = new Date();
let month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
let currentDate =  month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()

const Rating = withRouter(({ location: { pathname }, ratedMovies, ratedTV, handleClearRating, handleRating }) => {  
    const checkRatingMovie = pathname === "/account/rating";
    const checkRatingTV = pathname === "/account/rating/tv";

    return (
    <>
        <div className={cx('rating-container')}>
        
          <div className={cx('rating-title')}>
                  <h2 className={cx('Rtitle')}>My Ratings</h2>

                  <div className={cx('rating-tab')}>
                      <ul className={cx('Rtab-menu')} >
                          <li className={cx('Rtab-menu-items')}
                              style={{ borderBottom: checkRatingMovie ? `3px solid #ce3462` : `3px solid transparent` }}
                          >
                              <Link to="/account/rating" className={cx(['Rlink', checkRatingMovie ? "" : "notActiveLink"])}
                              >Movies <span style={{ color: `#ce3462`, marginLeft: `8px` }}> {ratedMovies.length}</span></Link>
                          </li>
                          <li className={cx('Rtab-menu-items')}
                              style={{ borderBottom: checkRatingTV ? `3px solid #ce3462` : `3px solid transparent` }}
                          >
                              <Link to="/account/rating/tv" className={cx(['Rlink', checkRatingTV ? "" : "notActiveLink"])}
                              >TV <span style={{ color: `#ce3462`, marginLeft: `8px` }}> {ratedTV.length}</span></Link>
                          </li>
                      </ul>
                  </div>
                  
              </div>

            <div className={cx('rating-content')}>
            {checkRatingMovie && 
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
                                <p>{movie.overview.length > 250 ? `${movie.overview.substring(0, 250)}...` : movie.overview}</p>
                            </div>
                            <div className={cx('actionBar')}>
                                <ul>
                                    <li>
                                        <OverlayTrigger
                                            trigger="click"
                                            key={movie.id}
                                            rootClose
                                            placement='right'
                                            overlay={
                                                <Tooltip className={cx('rating_tooltip')}>
                                                    <div className={cx('rating_wrapper')}>
                                                        <p>Rated on {currentDate}</p>
                                                        <div className={cx('rating_stars_wrapper')}>
                                                            <div className={cx('clear-rating')} onClick={() => handleClearRating(movie.id)} >
                                                                <span className={cx('fa-minus-circle')}></span>
                                                            </div>
                                                            <div className={cx('rating_stars')}>
                                                                <StarRating
                                                                    placeholderRating={movie.rating}
                                                                    emptySymbol="fa fa-star-o fa-2x"
                                                                    fullSymbol="fa fa-star fa-2x"
                                                                    placeholderSymbol="fa fa-star fa-2x"
                                                                    fractions={2}
                                                                    onClick={(rate) => handleRating(movie.id, rate)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tooltip>
                                            }
                                        >
                                            <button className={cx('ratingButton')}>
                                            <span className={cx('rating_number')}>{movie.rating}</span>
                                             Your rating
                                            </button>
                                        </OverlayTrigger>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))
            }
            {checkRatingTV && 
                ratedTV.map(show => (
                    <div className={cx('rating-items')} key={show.id}>
                        <Poster
                            key={show.id}
                            id={show.id}
                            imageUrl={show.poster_path}
                            title={show.name}
                            rating={show.vote_average}
                            year={show.first_air_date ? show.first_air_date.substring(0, 4) : ''}
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
                                        <OverlayTrigger
                                            trigger="click"
                                            key={show.id}
                                            rootClose
                                            placement='right'
                                            overlay={
                                                <Tooltip className={cx('rating_tooltip')}>
                                                    <div className={cx('rating_wrapper')}>
                                                        <p>Rated on {currentDate}</p>
                                                        <div className={cx('rating_stars_wrapper')}>
                                                            <div className={cx('clear-rating')} onClick={() => handleClearRating(show.id)} >
                                                                <span className={cx('glyphicon glyphicon-minus-sign')}></span>
                                                            </div>
                                                            <div className={cx('rating_stars')}>
                                                                <StarRating
                                                                    placeholderRating={show.rating}
                                                                    emptySymbol="fa fa-star-o fa-2x"
                                                                    fullSymbol="fa fa-star fa-2x"
                                                                    placeholderSymbol="fa fa-star fa-2x"
                                                                    fractions={2}
                                                                    onClick={(rate) => handleRating(show.id, rate)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tooltip>
                                            }
                                        >
                                            <button className={cx('ratingButton')}>
                                            <span className={cx('rating_number')}>{show.rating}</span>
                                             Your rating
                                            </button>
                                        </OverlayTrigger>

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

Rating.propTypes = {
    ratedMovies: PropTypes.array,
    ratedTV: PropTypes.array
};

export default Rating;