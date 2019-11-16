import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as detailActions from 'store/modules/detail';

import DetailPresenter from "components/detail/DetailPresenter";

class DetailContainer extends Component {

    componentDidMount() {

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
            let session_id = localStorage.getItem('session_id');
        
            if(isMovie) {
                DetailActions.getMovieDetail(parsedId);
                DetailActions.getMovieImdbId(parsedId);
                DetailActions.getMovieVideos(parsedId);
                if(session_id) {
                    DetailActions.getMovieAccountState({id: parsedId, session_id});
                }
            } else {
                DetailActions.getTvDetail(parsedId);
                DetailActions.getTvImdbId(parsedId);
                DetailActions.getTvVideos(parsedId);
                if(session_id) {
                    DetailActions.getTvAccountState({id: parsedId, session_id});
                }
            }
            document.documentElement.scrollTop = 0;

        } catch (e){
           console.log(e);
        }
    }

    handleFavoriteBtn = (media_id, favorite) => {
        const { location: { pathname }, DetailActions} = this.props;
        let session_id = localStorage.getItem('session_id');
        let account_id = localStorage.getItem('account_id');
        let isTV = pathname.includes("/show");
        let media_type = isTV ? 'tv' : 'movie';
        DetailActions.markAsFavorite({account_id, session_id, media_type, media_id, favorite});
    }

    handleClearRating = (id) => {
        const { location: { pathname }, DetailActions } = this.props;
        let session_id = localStorage.getItem('session_id');
        let isTV = pathname.includes("/show");

        if(isTV) {
            DetailActions.deleteRatingTV({id, session_id});
        } else  {
            DetailActions.deleteRatingMovies({id, session_id});
        }
    }

    handleRating = (id, rate) => {
        const { location: { pathname }, DetailActions } = this.props;
        let session_id = localStorage.getItem('session_id');
        let isTV = pathname.includes("/show");

        if(isTV) {
            DetailActions.postRatingTV({id, rate, session_id});
        } else  {
            DetailActions.postRatingMovies({id, rate, session_id});
        }
    }

    render() {
        const { result, account_state, imdb_id, videos, loading } = this.props;
        
        return (
            <>
                <DetailPresenter 
                    result={result} 
                    account_state={account_state}
                    imdb_id={imdb_id} 
                    videos={videos}
                    handleFavoriteBtn={this.handleFavoriteBtn}
                    handleClearRating={this.handleClearRating}
                    handleRating={this.handleRating}
                    loading={loading}
                />
            </>
        );
    }
}

export default withRouter(connect(
    (state) => ({
        result: state.detail.result,
        account_state: state.detail.account_state,
        imdb_id: state.detail.imdb_id,
        videos: state.detail.videos,
        loading: state.loading['detail/GET_MOVIE_DETAIL']
              || state.loading['detail/GET_MOVIE_IMDB_ID']
              || state.loading['detail/GET_MOVIE_VIDEOS']
              || state.loading['detail/GET_TV_DETAIL']
              || state.loading['detail/GET_TV_IMDB_ID']
              || state.loading['detail/GET_TV_VIDEOS']
              || state.loading['detail/GET_MOVIE_ACCOUNT_STATE']
              || state.loading['detail/GET_TV_ACCOUNT_STATE']
               
    }),
    (dispatch) => ({
        DetailActions: bindActionCreators(detailActions, dispatch)
    })
)(DetailContainer));