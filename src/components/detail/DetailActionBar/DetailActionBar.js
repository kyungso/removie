import React from "react";
import PropTypes from "prop-types";

import styles from './DetailActionBar.scss';
import classNames from 'classnames/bind';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

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
let currentDate =  month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();

const DetailActionBar = ({ account_state, handleFavoriteBtn, handleClearRating, handleRating }) => {

    let isFavorite = false;
    let rating = 0;
    let isRating = false;

    // favorite
    if(account_state.favorite === true) {
        isFavorite = '#ef47b6';
    } else  {
        isFavorite = '#fff';
    }

    // rating
    if(account_state.rated === false) {
        rating = 0;
        isRating = '#fff';
    } else {
        rating = account_state.rated.value;
        isRating = 'yellow';
    }
    
    return (
    <>
    <div className={cx('actionBar')}>
        <span className={cx('favoriteIcon')} onClick={() => handleFavoriteBtn(account_state.id, !account_state.favorite)} >
            <span className={cx('glyphicon glyphicon-heart')}
                  style={{ color: `${isFavorite}` }} > 
            </span>
        </span>
        <span className={cx('ratingIcon')}>
            <OverlayTrigger
                trigger="click"
                rootClose
                placement='right'
                overlay={
                <Tooltip className={cx('rating_tooltip')}>
                    <div className={cx('rating_wrapper')}>
                        <p>Rated on {currentDate}</p>
                        <div className={cx('rating_stars_wrapper')}>
                            <div className={cx('clear-rating')} onClick={() => handleClearRating(account_state.id)} >
                                <span className={cx('glyphicon glyphicon-minus-sign')}></span>
                            </div>
                            <div className={cx('rating_stars')}>
                                <StarRating
                                    placeholderRating={rating}
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    placeholderSymbol="fa fa-star fa-2x"
                                    fractions={2}
                                    onClick={(rate) => handleRating(account_state.id, rate)}
                                />
                            </div>
                        </div>
                    </div>
                </Tooltip>
                }>
                <span className={cx('glyphicon glyphicon-star')}
                      style={{ color: `${isRating}` }}>
                </span>
            </OverlayTrigger>
        </span>
    </div>
    </>
   );
};

DetailActionBar.propTypes = {
    account_state: PropTypes.object,
    handleFavoriteBtn: PropTypes.func,
    handleClearRating: PropTypes.func,
    handleRating: PropTypes.func,
};

export default DetailActionBar;