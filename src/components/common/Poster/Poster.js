import React from "react";
import PropTypes from "prop-types";
import styles from './Poster.scss';
import classNames from 'classnames/bind';
import { Link } from "react-router-dom";

import NoImage from 'lib/assets/noPosterSmall.png';

const cx = classNames.bind(styles);

const Poster = ({ id, imageUrl, title, rating, year, isMovie = false, isCollection = false }) => (
    <Link to={isMovie ? `/movie/${id}` : (isCollection ? `/collection/${id}` : `/show/${id}`)}>
        <div className={cx('poster-container')}>
            <div className={cx('posterImage-container')}>
                <div className={cx('poster-image')} 
                     style={{ backgroundImage: (imageUrl ? `url(https://image.tmdb.org/t/p/w300${imageUrl})` : `url(${NoImage})`) }}
                />
                { !isCollection &&
                <span className={cx('poster-rating')}>
                    <span role="img" aria-label="rating">
                        ⭐️
                    </span>{" "}
                    {rating}/10
                </span> }
            </div>
            <span className={cx('poster-title')}>
                    {title.length > 18 ? `${title.substring(0, 18)}...` : title}
            </span> 
            { !isCollection && <span className={cx('poster-year')}>{year}</span> }
        </div>
    </Link>
);

Poster.propTypes = {
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number,
    year: PropTypes.string,
    isMovie: PropTypes.bool,
    isCollection: PropTypes.bool
};

export default Poster;