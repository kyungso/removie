import React from "react";
import PropTypes from "prop-types";

import styles from './TVPresenter.scss';
import classNames from 'classnames/bind';

import Loader from "components/common/Loader";
import Slider from "components/common/Slider";

const cx = classNames.bind(styles);

const TVPresenter = ({ topRated, popular, airingToday, loading }) => {

  const calcStartIndex = (tvLength) => {
    const startIndex = [];
      for(let i = 0; i < tvLength; i++) {
        if(i % 5 === 0) {
            startIndex.push(i);
        }
      }
    return startIndex;
  };
    
  return (
    <>
    { loading  
        ? <Loader />
        : <div className={cx('tv-container')}>
            {/* 높은 평점의 TV 프로그램 */}
            {topRated && topRated.length > 0 && (
                calcStartIndex(topRated.length).map(startIdx => (
                  <Slider key={startIdx}>
                    {topRated.slice(startIdx, startIdx+5).map((show, index) => (
                      <Slider.Item media={show} key={show.id} index={index} isTV></Slider.Item>
                    ))}
                  </Slider>
                ))
            )}

            {/* 인기 TV 프로그램 */}
            {popular && popular.length > 0 && (
                calcStartIndex(topRated.length).map(startIdx => (
                  <Slider key={startIdx}>
                    {popular.slice(startIdx, startIdx+5).map((show, index) => (
                      <Slider.Item media={show} key={show.id} index={index} isTV></Slider.Item>
                    ))}
                  </Slider>
                ))
            )}

            {/* 오늘 방영할 TV 프로그램 */}
            {airingToday && airingToday.length > 0 && (
                calcStartIndex(topRated.length).map(startIdx => (
                  <Slider key={startIdx}>
                    {airingToday.slice(startIdx, startIdx+5).map((show, index) => (
                      <Slider.Item media={show} key={show.id} index={index} isTV></Slider.Item>
                    ))}
                  </Slider>
                ))
            )}
        </div>
    }
    </>
)};

TVPresenter.propTypes = {
    topRated: PropTypes.array,
    popular: PropTypes.array,
    airingToday: PropTypes.array
};

export default TVPresenter;