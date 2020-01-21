import React from "react";
import PropTypes from "prop-types";

import styles from './TVPresenter.scss';
import classNames from 'classnames/bind';

import Loader from "components/common/Loader";
import Slider from "components/common/Slider";

const cx = classNames.bind(styles);

const TVPresenter = ({ topRated, popular, airingToday, loading }) => (
    <>
    { loading  
        ? <Loader />
        : <div className={cx('tv-container')}>
            {topRated && topRated.length > 0 && (
                <Slider title="높은 평점의 TV 프로그램">
                {topRated.map((show, index) => (
                    <Slider.Item media={show} key={show.id} index={index} isTV></Slider.Item>
                ))}
                </Slider>
            )}

            {popular && popular.length > 0 && (
                <Slider title="인기 TV 프로그램">
                {popular.map((show, index) => (
                    <Slider.Item media={show} key={show.id} index={index} isTV></Slider.Item>
                ))}
                </Slider>
            )}

            {airingToday && airingToday.length > 0 && (
                <Slider title="오늘 방영할 TV 프로그램">
                {airingToday.map((show, index) => (
                    <Slider.Item media={show} key={show.id} index={index} isTV></Slider.Item>
                ))}
                </Slider>
            )}
        </div>
    }
    </>
);

TVPresenter.propTypes = {
    topRated: PropTypes.array,
    popular: PropTypes.array,
    airingToday: PropTypes.array
};

export default TVPresenter;