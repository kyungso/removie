import React, { useState } from "react";
import SliderContext from './SliderContext'
import useSliding from './useSlider';
import SlideButton from './SlideButton';
import Content from './Content';

import styles from './Slider.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Slider = ({ title, children, isHome }) => {
    const [currentSlide, setCurrentSlide] = useState(null);
    const [translateProps, setTranslateProps] = useState(null);
    const {
      handlePrev,
      handleNext,
      containerRef,
      hasPrev,
      hasNext,
      elementWidth,
      viewed,
      handleMouseOver,
      handleMouseLeave
    } = useSliding(setTranslateProps, React.Children.count(children));

    const handleSelect = media => {
      setCurrentSlide(media);
    };
  
    const handleClose = () => {
      setCurrentSlide(null);
    };

    const contextValue = {
      onSelectSlide: handleSelect,
      onCloseSlide: handleClose,
      currentSlide,
      elementWidth,
      viewed,
      handleMouseOver,
      handleMouseLeave
    };
  
    return (
      <SliderContext.Provider value={contextValue}>
       <div className={cx('slider-section')}>
        {title && <div className={cx('slider-title')}>{title}</div>}
        <div className={cx('slider-wrapper')}>
          <div className={cx('slider', { 'slider--open': currentSlide != null })} >
            <div ref={containerRef} className="slider-container" {...translateProps}>{children}</div>
          </div>
          {isHome && hasPrev && <SlideButton onClick={handlePrev} type="prev" />}
          {isHome && hasNext && <SlideButton onClick={handleNext} type="next" />}
        </div>
       </div>
        {currentSlide && <Content media={currentSlide} onClose={handleClose} />}
      </SliderContext.Provider>
    );
  };
  
  export default Slider;
  