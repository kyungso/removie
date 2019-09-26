import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as searchActions from 'store/modules/search';

import SearchPresenter from "components/search/SearchPresenter";
import { moviesApi, tvApi, collectionApi } from 'lib/api';

class SearchContainer extends Component {

    constructor(props) {
        super(props);

        const { location, SearchActions } = this.props;
        const query = queryString.parse(location.search)
        const value = query.keyword;

        if(value && value.length > 0) {
            SearchActions.changeInput({value});
        } 
    }

    async componentDidMount() {
        // const { SearchActions } = this.props;
        // SearchActions.initialize();
        
        // const { location, SearchActions } = this.props;
        // const query = queryString.parse(location.search)
        // const value = query.keyword;
        
        // try {
        //     if(value && value.length > 0) {
        //         SearchActions.changeInput({value});
        //     } else {
        //         SearchActions.changeInput('');
        //         SearchActions.initialize();
        //     }
        // } catch (e){
        //     console.log(e);
        // }
        
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
            this.props.history.push(`/search?keyword=${searchTerm}`);
            this.searchByTerm();
        }
    };

    searchByTerm = async () => {
        const { searchTerm, SearchActions } = this.props;
        
        try {
            var { data: { results: movieResults, total_pages: mtotal_pages } } = await moviesApi.search(searchTerm, 1);
            let mPages = 2;
            if(mtotal_pages > 1){
                while(mPages <= mtotal_pages) {
                    let { data: { results: mResults }} = await moviesApi.search(searchTerm, mPages);
                    movieResults = [...movieResults, ...mResults];
                    mPages++;
                }
            }

            var { data: { results: tvResults, total_pages: ttotal_pages } } = await tvApi.search(searchTerm, 1);
            let tPages = 2;
            if(ttotal_pages > 1){
                while(tPages <= ttotal_pages) {
                    let { data: { results: tResults }} = await tvApi.search(searchTerm, tPages);
                    tvResults = [...tvResults, ...tResults];
                    tPages++;
                }
            }

            var { data: { results: collectionResults, total_pages: ctotal_pages } } = await collectionApi.search(searchTerm, 1);
            let cPages = 2;
            if(ctotal_pages > 1){
                while(cPages <= ctotal_pages) {
                    let { data: { results: cResults }} = await collectionApi.search(searchTerm, cPages);
                    collectionResults = [...collectionResults, ...cResults];
                    cPages++;
                }
            }

            SearchActions.setSearchResults({movieResults, tvResults, collectionResults});
            
        } catch (e) {
            console.log(e);
        } 
    };

    render() {
        const { movieResults, tvResults, collectionResults, searchTerm, loading } = this.props;

        if(searchTerm && (!movieResults || !tvResults || !collectionResults)) {
            this.searchByTerm();
        }
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
        loading: state.pender.pending['search/GET_MOVIE_RESULTS'] || state.pender.pending['search/GET_TV_RESULTS'] || state.pender.pending['search/GET_COLLECTION_RESULTS'] 
    }),
    (dispatch) => ({
        SearchActions: bindActionCreators(searchActions, dispatch)
    })
)(SearchContainer));