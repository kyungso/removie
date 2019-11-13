import React from 'react';
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';

import styles from './SearchResults.scss';
import classNames from 'classnames/bind';

import Section from "components/section/SectionTemplate";
import Poster from "components/common/Poster";
import Pagination from "components/common/Pagination";
import Message from "components/common/Message";

const cx = classNames.bind(styles);

const SearchResults = withRouter(({ location: { pathname }, movieResults, movieTotalPages, tvResults, tvTotalPages, collectionResults, collectionTotalPages, searchTerm, activePage, searchByPage }) => (
    <>
    {pathname === "/search/movie_result" && movieResults && (
        <div className={cx('search-results')}>
            <Section title={'Movie Results'}>
                {movieResults.length === 0 
                ? <Message text="Nothing found" color="#95a5a6" />
                : movieResults.map(movie => (
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
            <Pagination pages={movieTotalPages} 
                        toLink={`/search/movie_result?keyword=${searchTerm}&page=`} 
                        activePage={activePage}
                        onClick={searchByPage}
                        scrollTo={[0,0]}
             />
        </div>
    )}

    {pathname === "/search/tv_result" && tvResults && (
        <div className={cx('search-results')}>
            <Section title={'TV Show Results'}>
                {tvResults.length === 0
                ? <Message text="Nothing found" color="#95a5a6" />
                : tvResults.map(show => (
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
            <Pagination pages={tvTotalPages} 
                        toLink={`/search/tv_result?keyword=${searchTerm}&page=`} 
                        activePage={activePage}
                        onClick={searchByPage} 
                        scrollTo={[0,0]}
            />
        </div>
    )}

    {pathname === "/search/collection_result" && collectionResults && (
        <div className={cx('search-results')}>
            <Section title={'Collection Results'}>
                {collectionResults.length === 0 
                ? <Message text="Nothing found" color="#95a5a6" />
                : collectionResults.map(collection => (
                    <Poster 
                        key={collection.id}
                        id={collection.id}
                        imageUrl={collection.poster_path}
                        title={collection.name}
                        isCollection={true}
                    />
                ))}
            </Section>
            <Pagination pages={collectionTotalPages} 
                        toLink={`/search/collection_result?keyword=${searchTerm}&page=`}
                        activePage={activePage}
                        onClick={searchByPage} 
                        scrollTo={[0,0]}
            />
        </div>
    )}
    </>
));

SearchResults.propTypes = {
    movieResults: PropTypes.array,
    movieTotalPages: PropTypes.number, 
    tvResults: PropTypes.array, 
    tvTotalPages: PropTypes.number, 
    collectionResults: PropTypes.array, 
    collectionTotalPages: PropTypes.number, 
    searchTerm: PropTypes.string, 
    activePage: PropTypes.number, 
    searchByPage: PropTypes.func
};

export default SearchResults;