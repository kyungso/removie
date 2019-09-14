import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import styles from './Movie.scss';
import classNames from 'classnames/bind';

import Section from "components/section/SectionTemplate";
import Loader from "components/common/Loader";
import Message from "components/common/Message";
import Poster from "components/common/Poster";

const cx = classNames.bind(styles);

const MoviePresenter = ({ nowPlaying, upcoming, popular, error, loading }) => (
    <>
        <Helmet>
            <title>Movies | Netflix</title>
        </Helmet>
        {loading ? (
            <Loader /> 
            ) : (
            <div className={cx('movie-container')}>
                <Helmet>
                    <title>Movies | Netflix</title>
                </Helmet>
                {nowPlaying && nowPlaying.length > 0 && (
                    <Section title="Now Playing">
                        {nowPlaying.map(movie => (
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
                
                {upcoming && upcoming.length > 0 && (
                    <Section title="Upcoming Movies">
                        {upcoming.map(movie => (
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

                {popular && popular.length > 0 && (
                    <Section title="Popular Movies">
                        {popular.map(movie => (
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
                {error && <Message color="#e74c3c" text={error} />}
            </div>
        )}
    </>
);

MoviePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    upcoming: PropTypes.array,
    popular: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
};

export default MoviePresenter;