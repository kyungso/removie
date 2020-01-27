import React from 'react';
import SliderContext from '../SliderContext';
import IconArrowDown from '../Icons/IconArrowDown';

import styles from './Item.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Item = ({ media, index, isTV }) => (
  <SliderContext.Consumer>
    {({ onSelectSlide, currentSlide, elementWidth, viewed, handleMouseOver, handleMouseLeave }) => {
      const isActive = currentSlide && currentSlide.id === media.id;
      const title = isTV ? media.name : media.title;

      const isFirstIndex = (viewed - 5) === index;
      const isLastIndex = (viewed - 1) === index;
      const onMouseOverSlide = () => {
        if(isFirstIndex || isLastIndex) {
          handleMouseOver(isFirstIndex, isLastIndex);
        }
      };
      const onMouseLeaveSlide = () => {
        if(isFirstIndex || isLastIndex) {
          handleMouseLeave(isFirstIndex, isLastIndex);
        }
      }

      return (
        <div
          className={cx('item', {
            'item--open': isActive
          })}
          style={{ flex: `0 0 ${elementWidth}px` }}
          onMouseOver={onMouseOverSlide}
          onMouseLeave={onMouseLeaveSlide}
        >
          <div className={cx('image')}>
            <div className={cx('image-backdrop')} 
                 style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w300${media.backdrop_path})` }}>
            </div>
            <div className={cx('image-ShadowTop')}></div>
            <div className={cx('image-content')}>
              <div className={cx('content-title')}>{title}</div>
              <span className={cx('content-item')}>
                {media.release_date
                  ? media.release_date.substring(0,4)
                  : media.first_air_date.substring(0,4)}
              </span>
              <span className={cx('content-divider')}>・</span>
              <span className={cx('content-item')}>
                ★ {media.vote_average}
                {/* {media.runtime ? media.runtime : (media.runtime === 0 ? '' : media.episode_run_time[0])} min */}
              </span>
            </div>
          </div>
          <div className={cx('image-title')}>
            {title.length > 18 ? `${title.substring(0, 18)}...` : title}
          </div> 
          <button onClick={() => onSelectSlide(media)} className={cx('show-details-button')}>
            <span>
              <IconArrowDown />
            </span>
          </button>
          {isActive && <div className={cx('mark')} />}
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;
