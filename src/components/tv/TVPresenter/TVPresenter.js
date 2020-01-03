import React from "react";
import PropTypes from "prop-types";

import styles from './TVPresenter.scss';
import classNames from 'classnames/bind';

import Loader from "components/common/Loader";
import Section from "components/section/SectionTemplate";
import Poster from "components/common/Poster";

const cx = classNames.bind(styles);

const TVPresenter = ({ topRated, popular, airingToday, loading }) => (
    <>
    { loading  
        ? <Loader />
        : <div className={cx('tv-container')}>
            {topRated && topRated.length > 0 && (
                <Section title="높은 평점의 TV 프로그램">
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
                <Section title="인기 TV 프로그램">
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
                <Section title="오늘 방영할 TV 프로그램">
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
        </div>
    }
    </>
);

TVPresenter.propTypes = {
    topRated: PropTypes.array,
    popular: PropTypes.array,
    airingToday: PropTypes.array
};

export default TVPresenter;