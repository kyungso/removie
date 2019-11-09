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

        let query = queryString.parse(location.search)
        let value = query.keyword;

        if(value && value.length > 0) {
            SearchActions.changeInput({value});
            this.refreshSearchByTerm(value);
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

    searchByTerm = async (searchTerm) => {
        const { SearchActions } = this.props;

        try {
            await SearchActions.getSearchMovies(searchTerm, 1);
            const { total_pages } = this.props;
            let mPages = 2;
            if(total_pages > 1){
                while(mPages <= total_pages) {
                    await SearchActions.getSearchPageMovies(searchTerm, mPages);
                    mPages++;
                }
            }

            await SearchActions.getSearchTV(searchTerm, 1);
            let tPages = 2;
            if(total_pages > 1){
                while(tPages <= total_pages) {
                    await SearchActions.getSearchPageTV(searchTerm, tPages);
                    tPages++;
                }
            }

            await SearchActions.getSearchCollection(searchTerm, 1);
            let cPages = 2;
            if(total_pages > 1){
                while(cPages <= total_pages) {
                    await SearchActions.getSearchPageCollection(searchTerm, cPages);
                    cPages++;
                }
            }
            
        } catch (e) {
            console.log(e);
        } 
    };
    originSearchByTerm = () => {
        const { searchTerm } = this.props;
        this.searchByTerm(searchTerm);
    }
    refreshSearchByTerm = (searchTerm) => {
        this.searchByTerm(searchTerm);
    };

    render() {
        const { movieResults, tvResults, collectionResults, searchTerm, loading } = this.props;
        return(
            <SearchPresenter 
                movieResults={movieResults}
                tvResults={tvResults}
                collectionResults={collectionResults}
                searchTerm={searchTerm}
                loading={loading}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm}
            />
        );
    }
}

export default withRouter(connect(
    (state) => ({
        movieResults: state.search.get('movieResults'),
        tvResults: state.search.get('tvResults'),
        collectionResults: state.search.get('collectionResults'),
        searchTerm: state.search.get('searchTerm'),
        total_pages: state.search.get('total_pages'),
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