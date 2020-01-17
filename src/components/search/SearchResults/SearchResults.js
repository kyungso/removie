import React from 'react';
import PropTypes from "prop-types";

import styles from './SearchResults.scss';
import classNames from 'classnames/bind';

import Section from "components/section/SectionTemplate";
import Poster from "components/common/Poster";
import Message from "components/common/Message";

const cx = classNames.bind(styles);

const SearchResults = ({ movieResults, tvResults, collectionResults, searchTerm }) => (
    <div className={cx('search-results')}>
      <h5>'{searchTerm}' 검색결과</h5>
      <Section title={'Movie Results'}>
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
      <Section title={'TV Show Results'}>
        {tvResults.map(show => (
            <Poster 
                key={show.id}
                id={show.id}
                imageUrl={show.poster_path}
                title={show.name}
                rating={show.vote_average}
                year={show.first_air_date ? show.first_air_date.substring(0, 4) : ''}
            />
        ))}
      </Section>
        <Section title={'Collection Results'}>
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
        {movieResults.length === 0 &&
         tvResults.length === 0 &&
         collectionResults.length === 0 &&
         <Message text="Nothing found" color="#95a5a6" />
        }
    </div>
);

SearchResults.propTypes = {
    movieResults: PropTypes.array,
    tvResults: PropTypes.array, 
    collectionResults: PropTypes.array,  
    searchTerm: PropTypes.string
};

export default SearchResults;