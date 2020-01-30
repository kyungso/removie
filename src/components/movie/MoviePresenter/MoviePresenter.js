import React from "react";
import PropTypes from "prop-types";

import styles from './MoviePresenter.scss';
import classNames from 'classnames/bind';

import Loader from "components/common/Loader";
import Slider from "components/common/Slider";

const cx = classNames.bind(styles);

const MoviePresenter = ({ nowPlaying, upcoming, popular, loading }) => {

  const calcStartIndex = (movieLength) => {
    const startIndex = [];
    for(let i = 0; i < movieLength; i++) {
        if(i % 5 === 0) {
            startIndex.push(i);
        }
    }
    return startIndex;
  };
  
  return(
    <>
    {loading 
        ? <Loader />
        : <div className={cx('movie-container')}>
            {/* 인기있는 영화 */}
            {nowPlaying && nowPlaying.length > 0 && (
                calcStartIndex(nowPlaying.length).map(startIdx => (
                  <Slider key={startIdx}>
                    {nowPlaying.slice(startIdx, startIdx+5).map((movie, index) => (
                      <Slider.Item media={movie} key={movie.id} index={index}></Slider.Item>
                    ))}
                  </Slider>
                ))
            )}

            {/* 개봉 예정 영화 */}
            {upcoming && upcoming.length > 0 && (
                calcStartIndex(upcoming.length).map(startIdx => (
                  <Slider key={startIdx}>
                    {upcoming.slice(startIdx, startIdx+5).map((movie, index) => (
                      <Slider.Item media={movie} key={movie.id} index={index}></Slider.Item>
                    ))}
                  </Slider>
                ))
            )}

            {/* 인기 영화 */}
            {popular && popular.length > 0 && (
                calcStartIndex(popular.length).map(startIdx => (
                  <Slider key={startIdx}>
                    {popular.slice(startIdx, startIdx+5).map((movie, index) => (
                      <Slider.Item media={movie} key={movie.id} index={index}></Slider.Item>
                    ))}
                  </Slider>
                ))
            )}
        </div>
    }
    </>
  )};

MoviePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    upcoming: PropTypes.array,
    popular: PropTypes.array,
};

export default MoviePresenter;