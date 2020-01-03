
import React from "react";

// import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';

import styles from "./HomeCarousel.scss";
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const HomeCarousel = ({ topRated }) => {
    return (
      <div className={cx('carousel-container')}>
        <Carousel interval={3000} indicators={false}>
            <Carousel.Item>
                <div className="d-block w-100 first" />
                {/* <Carousel.Caption>
                <h3>조커</h3>
                <p>조커의 이야기</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
                <div className="d-block w-100 second" />
                {/* <Carousel.Caption>
                <h3>기생충</h3>
                <p>기생충 이야기</p>
                </Carousel.Caption> */}
            </Carousel.Item>
        </Carousel>
      </div>
    );
}

export default HomeCarousel;