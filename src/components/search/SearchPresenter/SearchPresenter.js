import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import styles from './SearchPresenter.scss';
import classNames from 'classnames/bind';

import SearchTab from  "components/search/SearchTab";
import SearchResults from "components/search/SearchResults";

const cx = classNames.bind(styles);

const SearchPresenter = ({ movieResults, movieTotalPages, movieTotalResults, tvResults, tvTotalPages, tvTotalResults, collectionResults, collectionTotalPages, collectionTotalResults, searchTerm, activePage, handleSubmit, updateTerm, searchByPage }) => 
    <div className={cx('search-container')}>
        <Helmet>
            <title>Search | REMOVIE</title>
        </Helmet>
        <form className={cx('search-form')} onSubmit={handleSubmit}>
            <input
                className={cx('search-input')} 
                placeholder="Search Movies or TV Shows..."
                value={searchTerm}
                onChange={updateTerm}
            />
        </form>
        <>  
            {(movieResults && tvResults && collectionResults) &&
            <>
                <SearchTab movieTotalResults={movieTotalResults} 
                           tvTotalResults={tvTotalResults}
                           collectionTotalResults={collectionTotalResults}
                           searchTerm={searchTerm}
                /> 
                <SearchResults movieResults={movieResults} movieTotalPages={movieTotalPages} 
                               tvResults={tvResults} tvTotalPages={tvTotalPages}
                               collectionResults={collectionResults} collectionTotalPages={collectionTotalPages}
                               searchTerm={searchTerm} searchByPage={searchByPage}
                               activePage={activePage}
                />
            </>

            }
        </>
    </div>

SearchPresenter.propTypes = {
    movieResults: PropTypes.array,
    movieTotalPages: PropTypes.number,
    movieTotalResults: PropTypes.number,
    tvResults: PropTypes.array,
    tvTotalPages: PropTypes.number,
    tvTotalResults: PropTypes.number,
    collectionResults: PropTypes.array,
    collectionTotalPages: PropTypes.number,
    collectionTotalResults: PropTypes.number,
    searchTerm: PropTypes.string,
    activePage: PropTypes.number,
    handleSubmit: PropTypes.func.isRequired,
    updateTerm: PropTypes.func.isRequired,
    searchByPage: PropTypes.func.isRequired,
};

export default SearchPresenter;