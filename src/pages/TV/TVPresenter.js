import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import styles from './TV.scss';
import classNames from 'classnames/bind';

import Section from "components/section/SectionTemplate";
import Loader from "components/common/Loader";
import Message from "components/common/Message";
import Poster from "components/common/Poster";

const cx = classNames.bind(styles);

const TVPresenter = ({ topRated, popular, airingToday, loading, error }) => (
    <>
        <Helmet>
            <title>TV Shows | Netflix</title>
        </Helmet>
        {loading ? (
            <Loader />
        ) : (
            <div className={cx('tv-container')}>
                {topRated && topRated.length > 0 && (
                    <Section title="Top Rated Shows">
                        {topRated.map(show => (
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

                {popular && popular.length > 0 && (
                    <Section title="Popular Shows">
                        {popular.map(show => (
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

                {airingToday && airingToday.length > 0 && (
                    <Section title="Airing Today">
                        {airingToday.map(show => (
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
                {error && <Message color="#e74c3c" text={error}/>}
            </div>
        )}
    </>
);

TVPresenter.propTypes = {
    topRated: PropTypes.array,
    popular: PropTypes.array,
    airingToday: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default TVPresenter;