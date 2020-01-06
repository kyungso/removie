import React from "react";

import styles from './DetailActionBar.scss';
import classNames from 'classnames/bind';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const cx = classNames.bind(styles);

const DetailInActionBar = ({ vote_average }) => {
    
    return (
    <>
    <div className={cx('actionBar')}>
        <span className={cx('favoriteIcon')} >
            <OverlayTrigger
                placement='bottom'
                overlay={
                <Tooltip className={cx('login_tooltip')}>
                    <strong>Login</strong> to add this movie
                </Tooltip>
                }>
                <span className={cx('fa-heart glyphicon-heart')}></span>
            </OverlayTrigger>
        </span>
        <span className={cx('ratingIcon')}>
            <OverlayTrigger
                placement='bottom'
                overlay={
                <Tooltip className={cx('login_tooltip')}>
                    <strong>Login</strong> to rate this movie
                </Tooltip>
                }>
                <span className={cx('fa-star glyphicon-star')}></span>
            </OverlayTrigger>
        </span>
        <span className={cx('rating_average')}>
            <span role="img" aria-label="rating">
                평점 ⭐️
            </span>{" "}
            {vote_average} / 10
        </span>
    </div>
    </>
   );
};

export default DetailInActionBar;