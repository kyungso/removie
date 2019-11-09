import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as detailActions from 'store/modules/detail';
import * as accountActions from 'store/modules/account';

import DetailPresenter from "components/detail/DetailPresenter";
import Loader from 'components/common/Loader';

class DetailContainer extends Component {

    async componentDidMount() {

        const {
            location: { pathname },
            match: { params: { id } },
            history: { push },
        } = this.props;

        const isMovie = pathname.includes("/movie/");
        const parsedId = parseInt(id);
        if(isNaN(parsedId)) {
            return push("/");
        }

        try {
            const { DetailActions } = this.props;
            let sessionId = localStorage.getItem('session_id');
            console.log(sessionId);
            if(isMovie) {
                DetailActions.getMovieDetail(parsedId);
                DetailActions.getMovieImdbId(parsedId);
                DetailActions.getMovieVideos(parsedId);
                if(sessionId) {
                    DetailActions.getMovieAccountState(parsedId, sessionId);
                }
            } else {
                DetailActions.getTvDetail(parsedId);
                DetailActions.getTvImdbId(parsedId);
                DetailActions.getTvVideos(parsedId);
                if(sessionId) {
                    DetailActions.getTvAccountState(parsedId, sessionId);
                }
            }

        } catch (e){
           console.log(e);
        }
    }

    handleFavoriteBtn = (media_id, favorite) => {
        const { location: { pathname }, AccountActions } = this.props;
        let sessionId = localStorage.getItem('session_id');
        let accountId = localStorage.getItem('accountId');
        let isTV = pathname.includes("/show");
        let media_type = isTV ? 'tv' : 'movie';
        AccountActions.markAsFavorite(accountId, sessionId, {media_type, media_id, favorite});
    }

    handleClearRating = (id) => {
        const { location: { pathname }, AccountActions } = this.props;
        let sessionId = localStorage.getItem('session_id');
        let isTV = pathname.includes("/show");

        if(isTV) {
            AccountActions.deleteRatingTV(id, sessionId);
        } else  {
            AccountActions.deleteRatingMovies(id, sessionId);
        }
    }

    handleRating = (id, rate) => {
        const { location: { pathname }, DetailActions, AccountActions } = this.props;
        let sessionId = localStorage.getItem('session_id');
        let isTV = pathname.includes("/show");

        if(isTV) {
            AccountActions.postRatingTV(id, rate, sessionId);
            DetailActions.editRating(rate);
        } else  {
            AccountActions.postRatingMovies(id, rate, sessionId);
            DetailActions.editRating(rate);
        }
    }

    render() {
        const { result, account_state, imdb_id, videos, loading } = this.props;
        
        return (
            <>
            {
                loading 
                ? (<Loader />) 
                :
                (result && imdb_id && videos &&
                <DetailPresenter 
                    result={result} 
                    account_state={account_state}
                    imdb_id={imdb_id} 
                    videos={videos}
                    handleFavoriteBtn={this.handleFavoriteBtn}
                    handleClearRating={this.handleClearRating}
                    handleRating={this.handleRating}
                />)
            }
            </>
        );
    }
}

export default withRouter(connect(
    (state) => ({
        result: state.detail.get('result'),
        account_state: state.detail.get('account_state'),
        imdb_id: state.detail.get('imdb_id'),
        videos: state.detail.get('videos'), 
        editRating: state.detail.get('editRating'),
        loading: state.pender.pending['detail/GET_MOVIE_DETAIL'] 
              || state.pender.pending['detail/GET_MOVIE_ACCOUNT_STATE']
              || state.pender.pending['detail/GET_MOVIE_IMDB_ID']
              || state.pender.pending['detail/GET_MOVIE_VIDEOS']
              || state.pender.pending['detail/GET_TV_DETAIL']
              || state.pender.pending['detail/GET_TV_ACCOUNT_STATE']
              || state.pender.pending['detail/GET_TV_IMDB_ID']
              || state.pender.pending['detail/GET_TV_VIDEOS']
    }),
    (dispatch) => ({
        DetailActions: bindActionCreators(detailActions, dispatch),
        AccountActions: bindActionCreators(accountActions, dispatch)
    })
)(DetailContainer));