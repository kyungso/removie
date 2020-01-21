import React from "react";
import PropTypes from "prop-types";

import styles from './MoviePresenter.scss';
import classNames from 'classnames/bind';

import Loader from "components/common/Loader";
import Slider from "components/common/Slider";

const cx = classNames.bind(styles);

const MoviePresenter = ({ nowPlaying, upcoming, popular, loading }) => (
    <>
    {loading 
        ? <Loader />
        : <div className={cx('movie-container')}>
            {nowPlaying && nowPlaying.length > 0 && (
                <Slider title="현재 상영 영화">
                {nowPlaying.map((movie, index) => (
                    <Slider.Item media={movie} key={movie.id} index={index}></Slider.Item>
              ))}
                </Slider>
            )}

            {upcoming && upcoming.length > 0 && (
                <Slider title="개봉 예정 영화">
                {upcoming.map((movie, index) => (
                    <Slider.Item media={movie} key={movie.id} index={index}></Slider.Item>
                ))}
                </Slider>
            )}

            {popular && popular.length > 0 && (
                <Slider title="인기 영화">
                {popular.map((movie, index) => (
                    <Slider.Item media={movie} key={movie.id} index={index}></Slider.Item>
                ))}
                </Slider>
            )}
        </div>
    }
    </>
);

MoviePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    upcoming: PropTypes.array,
    popular: PropTypes.array,
};

export default MoviePresenter;