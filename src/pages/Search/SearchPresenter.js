import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import styles from './Search.scss';
import classNames from 'classnames/bind';

import Loader from "components/common/Loader";
import Message from "components/common/Message";
import SearchTab from  "components/search/SearchTab";
import SearchResults from "components/search/SearchResults";

const cx = classNames.bind(styles);

const SearchPresenter = ({ movieResults, tvResults, collectionResults, loading, error, searchTerm, handleSubmit, updateTerm }) => 
    <div className={cx('search-container')}>
        <Helmet>
            <title>Search | Netflix</title>
        </Helmet>
        <form className={cx('search-form')} onSubmit={handleSubmit}>
            <input
                className={cx('search-input')} 
                placeholder="Search Movies or TV Shows..."
                value={searchTerm}
                onChange={updateTerm}
            />
        </form>
        {loading ? (
            <Loader />
        ) : (
            <>
                {(movieResults || tvResults || collectionResults) && 
                <>
                    <SearchTab movieResults={movieResults} tvResults={tvResults} collectionResults={collectionResults}/> 
                    <SearchResults movieResults={movieResults} tvResults={tvResults} collectionResults={collectionResults}/>
                </>
                }

                {error && <Message color="#e74c3c" text={error} />}
                {tvResults &&
                  movieResults &&
                    collectionResults &&
                    tvResults.length === 0 &&
                      movieResults.length === 0 && 
                      collectionResults.length === 0 && (
                        <Message text="Nothing found" color="#95a5a6" />
                )}
            </>
        )}
    </div>

SearchPresenter.propTypes = {
    movieResults: PropTypes.array,
    tvResults: PropTypes.array,
    collectionResults: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    searchTerm: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    updateTerm: PropTypes.func.isRequired
};

export default SearchPresenter;