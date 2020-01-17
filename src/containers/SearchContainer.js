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

        const { SearchActions, location } = this.props;
        // refresh page case
        let query = queryString.parse(location.search);
        let value = query.keyword;
        if(value && value.length > 0) {
            SearchActions.changeInput({value});
            this.searchByTerm(value, 1);
        }

        document.documentElement.scrollTop = 0;
    }

    searchByTerm = (searchTerm, page) => {
        const { SearchActions } = this.props;

        try {
            SearchActions.getSearchMovies({searchTerm, page});
            SearchActions.getSearchTV({searchTerm, page});
            SearchActions.getSearchCollection({searchTerm, page});
        } catch (e) {
            console.log(e);
        } 
    };

    render() {
        const { movieResults, tvResults, collectionResults, searchTerm } = this.props;
        return(
            <SearchPresenter 
                movieResults={movieResults}
                tvResults={tvResults}
                collectionResults={collectionResults}
                searchTerm={searchTerm}
                handleSubmit={this.handleSubmit}
            />
        );
    }
}

export default withRouter(connect(
    (state) => ({
        movieResults: state.search.movieResults,
        tvResults: state.search.tvResults,
        collectionResults: state.search.collectionResults,
        searchTerm: state.search.searchTerm,
    }),
    (dispatch) => ({
        SearchActions: bindActionCreators(searchActions, dispatch)
    })
)(SearchContainer));