import React from "react";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.scss";
import classNames from 'classnames/bind';
import Poster from "components/common/Poster";

const cx = classNames.bind(styles);

const Carousel = ({ topRated }) => {
    const settings = {
        dots: true,
        slidesToShow: 3,
        slideToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };
    return (
        <div className={cx('carousel-container')}>
            <div className={cx('carousel-title')}>Top Rated</div>
            <Slider {...settings}>
                {topRated && topRated.length > 0 && topRated.map(top => (
                    <div key={top.id}>
                        <Poster 
                            id={top.id}
                            imageUrl={top.backdrop_path}
                            title={top.title}
                            rating={top.vote_average}
                            isMovie={true}
                            isCollection={true}
                            isCarousel={true}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Carousel;