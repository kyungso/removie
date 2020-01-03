import React from "react";
import PropTypes from "prop-types";

import styles from './HomePresenter.scss';
import classNames from 'classnames/bind';

import Loader from 'components/common/Loader';
import Section from "components/section/SectionTemplate";
import Poster from "components/common/Poster";
import HomeCarousel from "components/carousel/HomeCarousel";

const cx = classNames.bind(styles);
  
const HomePresenter = ({ movieTrending, tvTrending, topRated, loading }) => (
    <>
    {loading ? <Loader />
        : (
        <>
        {topRated && topRated.length > 0 && <HomeCarousel topRated={topRated} />}
        <div className={cx('home-container')}>
            {movieTrending && movieTrending.length > 0 && (
                <Section title="오늘의 추천 영화" isHome={true}>
                    {movieTrending.map(movie => (
                        <Poster 
                            key={movie.id}
                            id={movie.id}
                            imageUrl={movie.poster_path}
                            title={movie.title}
                            rating={movie.vote_average}
                            year={movie.release_date.substring(0, 4)}
                            isMovie={true}
                        />
                    ))}
                </Section>
            )}

            {tvTrending && tvTrending.length > 0 && (
                <Section title="오늘의 추천 TV 프로그램" isHome={true}>
                    {tvTrending.map(show => (
                        <Poster 
                            key={show.id}
                            id={show.id}
                            imageUrl={show.poster_path}
                            title={show.name}
                            rating={show.vote_average}
                            year={show.first_air_date.substring(0, 4)}
                        />
                    ))}
                </Section>
            )}
        </div>
        </>
        )
    }
    </>
);

HomePresenter.propTypes = {
    movieTrending: PropTypes.array,
    tvTrending: PropTypes.array,
    topRated: PropTypes.array,
};

export default HomePresenter;