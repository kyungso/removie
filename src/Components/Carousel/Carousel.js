import React from "react";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Poster from "../Poster";

import "./Carousel.css";

const Container = styled.div`
    maring-top: 10px;
    margin-bottom: 80px;
    margin-left: 80px;
    margin-right: 100px;
`;

const Title = styled.div`
    margin-bottom: 20px;
    font-size: 17px;
    font-weight: 600;
`;

const Carousel = ({ topRated }) => {
    const settings = {
        dots: true,
        slidesToShow: 3,
        slideToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };
    return (
        <Container>
            <Title>Top Rated</Title>
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
        </Container>
    );
}

export default Carousel;