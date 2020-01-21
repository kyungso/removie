import React from "react";
import PropTypes from "prop-types";

import styles from './HomePresenter.scss';
import classNames from 'classnames/bind';

import Loader from 'components/common/Loader';
import HomeCarousel from "components/carousel/HomeCarousel";

import Slider from 'components/common/Slider';

const cx = classNames.bind(styles);
  
const HomePresenter = ({ movieTrending, tvTrending, loading }) => (
    <>
    {loading ? <Loader />
        : (
        <>
        <HomeCarousel />
        
        <div className={cx('home-container')}>
          {movieTrending && movieTrending.length > 0 && (
            <Slider title="오늘의 추천 영화" isHome>
              {movieTrending.map((movie, index) => (
                <Slider.Item media={movie} key={movie.id} index={index}></Slider.Item>
              ))}
            </Slider>
          )}

          {tvTrending && tvTrending.length > 0 && (
            <Slider title="오늘의 추천 TV 프로그램" isHome>
              {tvTrending.map((show, index) => (
                <Slider.Item media={show} key={show.id} index={index} isTV></Slider.Item>
              ))}
            </Slider>
          )}
        </div>
        </>
        )
    }
    </>
);

HomePresenter.propTypes = {
    movieTrending: PropTypes.array,
    tvTrending: PropTypes.array
};

export default HomePresenter;