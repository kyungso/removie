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
        
    }

    componentDidUpdate(prevProps) {
        if(this.props.location.pathname !== prevProps.location.pathname) {
            this.originSearchByTerm();
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

    searchByTerm = async (searchTerm, page) => {
        const { SearchActions } = this.props;

        try {
            await SearchActions.getSearchMovies(searchTerm, page);
            await SearchActions.getSearchTV(searchTerm, page);
            await SearchActions.getSearchCollection(searchTerm, page);
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
    searchByPage = async (page) => {
        const { searchTerm } = this.props;
        this.searchByTerm(searchTerm, page);
    }
    // updateTerm = (event) => {
    //     const { SearchActions } = this.props;
    //     const { value } = event.target; 
    //     SearchActions.changeInput({value});
    // }

    // handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const { searchTerm } = this.props;
    //     if(searchTerm !== "") {
    //         this.props.history.push(`/search/movie_result?keyword=${searchTerm}`);
    //         this.originSearchByTerm();
    //     }
    // };

    // searchByTerm = async (searchTerm) => {
    //     const { SearchActions } = this.props;

    //     try {
    //         await SearchActions.getSearchMovies(searchTerm, 1);
    //         await SearchActions.getSearchTV(searchTerm, 1);
    //         await SearchActions.getSearchCollection(searchTerm, 1);
    //     } catch (e) {
    //         console.log(e);
    //     } 
    // };
    // originSearchByTerm = () => {
    //     const { searchTerm } = this.props;
    //     this.searchByTerm(searchTerm);
    // }
    // refreshSearchByTerm = (searchTerm) => {
    //     this.searchByTerm(searchTerm);
    // };

    // searchByPage = async (page) => {
    //     const { SearchActions, searchTerm } = this.props;
        
    //     if(this.props.location.pathname === "/search/movie_result") {
    //         await SearchActions.getSearchPageMovies(searchTerm, page);
    //     }else if(this.props.location.pathname === "/search/tv_result") {
    //         await SearchActions.getSearchPageTV(searchTerm, page);
    //     }else if(this.props.location.pathname === "/search/collection_result") {
    //         await SearchActions.getSearchPageCollection(searchTerm, page);
    //     }
    // }

    render() {
        const { movieResults, movieTotalPages, movieTotalResults, tvResults, tvTotalPages, tvTotalResults, collectionTotalPages, collectionTotalResults, collectionResults, searchTerm, activePage, loading } = this.props;
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
                loading={loading}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm}
                searchByPage={this.searchByPage}
            />
        );
    }
}

export default withRouter(connect(
    (state) => ({
        movieResults: state.search.get('movieResults'),
        movieTotalPages: state.search.get('movieTotalPages'),
        movieTotalResults: state.search.get('movieTotalResults'),
        tvResults: state.search.get('tvResults'),
        tvTotalPages: state.search.get('tvTotalPages'),
        tvTotalResults: state.search.get('tvTotalResults'),
        collectionResults: state.search.get('collectionResults'),
        collectionTotalPages: state.search.get('collectionTotalPages'),
        collectionTotalResults: state.search.get('collectionTotalResults'),
        searchTerm: state.search.get('searchTerm'),
        activePage: state.search.get('activePage'),
        loading: state.pender.pending['search/GET_SEARCH_MOVIES'] 
              || state.pender.pending['search/GET_SEARCH_PAGE_MOVIES'] 
              || state.pender.pending['search/GET_SEARCH_TV'] 
              || state.pender.pending['search/GET_SEARCH_PAGE_TV'] 
              || state.pender.pending['search/GET_SEARCH_COLLECTION'] 
              || state.pender.pending['search/GET_SEARCH_PAGE_COLLECTION'] 
    }),
    (dispatch) => ({
        SearchActions: bindActionCreators(searchActions, dispatch)
    })
)(SearchContainer));