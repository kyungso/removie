import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import styles from './Home.scss';
import classNames from 'classnames/bind';

import Section from "components/section/SectionTemplate";
import Loader from "components/common/Loader";
import Message from "components/common/Message";
import Poster from "components/common/Poster";
import Carousel from "components/carousel/HomeCarousel";

const cx = classNames.bind(styles);
  
const HomePresenter = ({ movieTrending, tvTrending, topRated, loading, error }) => (
    <>
        <Helmet>
            <title>Home | Netflix</title>
        </Helmet>
        {loading ? (
            <Loader /> 
            ) : (
            <>
            <div className={cx('home-container')}>
                <Helmet>
                    <title>Home | Netflix</title>
                </Helmet>

                <Carousel topRated={topRated} />

                {movieTrending && movieTrending.length > 0 && (
                    <Section title="Trending Movies" isHome={true}>
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
                    <Section title="Trending TV Shows" isHome={true}>
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
                {error && <Message color="#e74c3c" text={error} />}
            </div>
            </>
        )}
    </>
);

HomePresenter.propTypes = {
    movieTrending: PropTypes.array,
    tvTrending: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
};

export default HomePresenter;