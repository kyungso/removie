import React, { PureComponent } from "react";
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as searchActions from 'store/modules/search';

import SearchPresenter from "components/search/SearchPresenter";

class SearchContainer extends PureComponent {

    constructor(props) {
        super(props);

        let { location, SearchActions } = this.props;
        if(location.pathname === "/search") {
            SearchActions.initialize();
        }

        // refresh page case
        let query = queryString.parse(location.search);
        let value = query.keyword;
        
        if(value && value.length > 0) {
            SearchActions.changeInput({value});
            if(query.page) {
                this.refreshSearchByTerm(value, query.page);
            } else {
                this.refreshSearchByTerm(value, 1);
            }
        }

        document.documentElement.scrollTop = 0;
    }

    componentDidUpdate(prevProps) {
        let { location: { pathname }, searchTerm, SearchActions } = this.props;
        if(pathname !== prevProps.location.pathname) {
            if(pathname === "/search/movie_result") {
                SearchActions.getSearchMovies({searchTerm}, 1);
            } else if(pathname === "/search/tv_result") {
                SearchActions.getSearchTV({searchTerm}, 1);
            } else if(pathname === "/search/collection_result") {
                SearchActions.getSearchCollection({searchTerm}, 1);
            }
        }
    }

    updateTerm = (event) => {
        const { SearchActions } = this.props;
        const { value } = event.target; 
        SearchActions.changeInput({value});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { searchTerm } = this.props;
        if(searchTerm !== "") {
            this.props.history.push(`/search/movie_result?keyword=${searchTerm}`);
            this.originSearchByTerm();
        }
    };

    searchByTerm = (searchTerm, page) => {
        const { location: { pathname }, SearchActions } = this.props;

        try {
            if(page === 1) {
                SearchActions.getSearchMovies({searchTerm, page});
                SearchActions.getSearchTV({searchTerm, page});
                SearchActions.getSearchCollection({searchTerm, page});
            }else {
                if(pathname === "/search/movie_result") {
                    SearchActions.getSearchMovies({searchTerm, page});
                } else if(pathname === "/search/tv_result") {
                    SearchActions.getSearchTV({searchTerm, page});
                } else if(pathname === "/search/collection_result") {
                    SearchActions.getSearchCollection({searchTerm, page});
                }
            }
        } catch (e) {
            console.log(e);
        } 
    };
    originSearchByTerm = () => {
        const { searchTerm } = this.props;
        this.searchByTerm(searchTerm, 1);
    }
    refreshSearchByTerm = (searchTerm, page) => {
        this.searchByTerm(searchTerm, page);
    };
    searchByPage = (page) => {
        const { searchTerm } = this.props;
        this.searchByTerm(searchTerm, page);
    }

    render() {
        const { movieResults, movieTotalPages, movieTotalResults, tvResults, tvTotalPages, tvTotalResults, collectionTotalPages, collectionTotalResults, collectionResults, searchTerm, activePage } = this.props;
        return(
            <SearchPresenter 
                movieResults={movieResults}
                movieTotalPages={movieTotalPages}
                movieTotalResults={movieTotalResults}
                tvResults={tvResults}
                tvTotalPages={tvTotalPages}
                tvTotalResults={tvTotalResults}
                collectionResults={collectionResults}
                collectionTotalPages={collectionTotalPages}
                collectionTotalResults={collectionTotalResults}
                searchTerm={searchTerm}
                activePage={activePage}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm}
                searchByPage={this.searchByPage}
            />
        );
    }
}

export default withRouter(connect(
    (state) => ({
        movieResults: state.search.movieResults,
        movieTotalPages: state.search.movieTotalPages,
        movieTotalResults: state.search.movieTotalResults,
        tvResults: state.search.tvResults,
        tvTotalPages: state.search.tvTotalPages,
        tvTotalResults: state.search.tvTotalResults,
        collectionResults: state.search.collectionResults,
        collectionTotalPages: state.search.collectionTotalPages,
        collectionTotalResults: state.search.collectionTotalResults,
        searchTerm: state.search.searchTerm,
        activePage: state.search.activePage
    }),
    (dispatch) => ({
        SearchActions: bindActionCreators(searchActions, dispatch)
    })
)(SearchContainer));