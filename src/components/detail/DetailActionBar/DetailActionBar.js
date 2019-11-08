import React, { useRef } from "react";
import { Link, withRouter } from 'react-router-dom';
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

const DetailActionBar = withRouter(({ location: { pathname }, account_state }) => {

    const isMovie = pathname.includes("/movie/");

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

    const favoriteBtn = useRef(null);
    const ratingBtn = useRef(null);
    
    const handleMouseOver = () => {
        if(account_state.favorite === true) {
            console.log(favoriteBtn.current.style);
            console.log(favoriteBtn.current.style.color);
        }
    }

    return (
    <>
    <div className={cx('actionBar')}>
        <span className={cx('favoriteIcon')} >
            <span className={cx('glyphicon glyphicon-heart')} ref={favoriteBtn}
                  style={{ color: `${isFavorite}` }} onMouseOver={() => handleMouseOver()} > 
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
                            {/* <div className={cx('clear-rating')} onClick={() => handleClearRating(id)} > */}
                            <div className={cx('clear-rating')}>
                                <span className={cx('glyphicon glyphicon-minus-sign')}></span>
                            </div>
                            <div className={cx('rating_stars')}>
                                <StarRating
                                    placeholderRating={rating}
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    placeholderSymbol="fa fa-star fa-2x"
                                    fractions={2}
                                    // onClick={(rate) => handleRating(id, rate)}
                                />
                            </div>
                        </div>
                    </div>
                </Tooltip>
                }>
                <span className={cx('glyphicon glyphicon-star')} ref={ratingBtn}
                      style={{ color: `${isRating}` }}>
                </span>
            </OverlayTrigger>
        </span>
    </div>
    </>
   );
});

export default DetailActionBar;