import React from 'react';
import SliderContext from '../SliderContext';
import IconArrowDown from '../Icons/IconArrowDown';

import styles from './Item.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Item = ({ movie, index }) => (
  <SliderContext.Consumer>
    {({ onSelectSlide, currentSlide, elementWidth, viewed, handleMouseOver, handleMouseLeave }) => {
      const isActive = currentSlide && currentSlide.id === movie.id;
      
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
          <img src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`} alt="poster" />
          <div className={cx('image-title')}>
            {movie.title.length > 18 ? `${movie.title.substring(0, 18)}...` : movie.title}
          </div> 
          <button onClick={() => onSelectSlide(movie)} className={cx('show-details-button')}>
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
