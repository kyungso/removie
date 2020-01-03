import React from "react";
import PropTypes from "prop-types";

import styles from './MoviePresenter.scss';
import classNames from 'classnames/bind';

import Loader from "components/common/Loader";
import Section from "components/section/SectionTemplate";
import Poster from "components/common/Poster";

const cx = classNames.bind(styles);

const MoviePresenter = ({ nowPlaying, upcoming, popular, loading }) => (
    <>
    {loading 
        ? <Loader />
        : <div className={cx('movie-container')}>
            {nowPlaying && nowPlaying.length > 0 && (
                <Section title="현재 상영 영화">
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
                <Section title="개봉 예정 영화">
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
                <Section title="인기 영화">
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
        </div>
    }
    </>
);

MoviePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    upcoming: PropTypes.array,
    popular: PropTypes.array,
};

export default MoviePresenter;