import React from "react";
import PropTypes from "prop-types";

import styles from './SearchPresenter.scss';
import classNames from 'classnames/bind';

import SearchResults from "components/search/SearchResults";;

const cx = classNames.bind(styles);

const SearchPresenter = ({ movieResults, tvResults, collectionResults, searchTerm }) => { 

    return (
     <div className={cx('search-container')}>
      {(movieResults && tvResults && collectionResults) &&
        <SearchResults 
            movieResults={movieResults} 
            tvResults={tvResults} 
            collectionResults={collectionResults}
            searchTerm={searchTerm}
        />
      }
     </div>
    );
};

SearchPresenter.propTypes = {
    movieResults: PropTypes.array,
    tvResults: PropTypes.array,
    collectionResults: PropTypes.array,
    searchTerm: PropTypes.string,
};

export default SearchPresenter;