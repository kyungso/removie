import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './SearchResults.scss';
import classNames from 'classnames/bind';

import Section from "components/section/SectionTemplate";
import Poster from "components/common/Poster";

const cx = classNames.bind(styles);

export default withRouter(({ location, movieResults, tvResults, collectionResults }) => (
    <>
    {location.pathname === "/search/movie_result" && movieResults && movieResults.length > 0 && (
        <div className={cx('search-results')}>
            <Section title={`Movie Results (${movieResults.length })`}>
                {movieResults.map(movie => (
                    <Poster 
                        key={movie.id}
                        id={movie.id}
                        imageUrl={movie.poster_path}
                        title={movie.title}
                        rating={movie.vote_average}
                        year={movie.release_date ? movie.release_date.substring(0, 4) : ''}
                        isMovie={true}
                    />
                ))}
            </Section>
        </div>
    )}

    {location.pathname === "/search/tv_result" && tvResults && tvResults.length > 0 && (
        <div className={cx('search-results')}>
            <Section title={`TV Show Results (${tvResults.length})`}>
                {tvResults.map(show => (
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
        </div>
    )}

    {location.pathname === "/search/collection_result" && collectionResults && collectionResults.length > 0 && (
        <div className={cx('search-results')}>
            <Section title={`Collection Results (${collectionResults.length})`}>
                {collectionResults.map(collection => (
                    <Poster 
                        key={collection.id}
                        id={collection.id}
                        imageUrl={collection.poster_path}
                        title={collection.name}
                        isCollection={true}
                    />
                ))}
            </Section>
        </div>
    )}
    </>
));
