import React, { useRef, useState, useEffect } from "react";

import { Carousel } from 'react-bootstrap';

import styles from "./HomeCarousel.scss";
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const carouselUrl = [
  'https://image.tmdb.org/t/p/original/pLO4qJdQxhAMPaFJu7q8bgme6R3.jpg',
  'https://image.tmdb.org/t/p/original/xnPYcbmTN3l58uU93wcboBXD0oW.jpg',
]
const HomeCarousel = () => {
    return (
      <div className={cx('carousel-container')}>
        <Carousel interval={3000} indicators={false}>
            { carouselUrl.map(url =>
            <Carousel.Item key={url}>
                <div className="d-block w-100" 
                     style={{ backgroundImage: `url(${url})` }}
                />
                {/* <Carousel.Caption>
                <h3>조커</h3>
                <p>조커의 이야기</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            )}
        </Carousel>
        <div className={cx('carousel-ShadowCenter')}></div>
        <div className={cx('carousel-ShadowTop')}></div>
        <div className={cx('carousel-ShadowBottom')}></div>
      </div>
    );
}

export default HomeCarousel;