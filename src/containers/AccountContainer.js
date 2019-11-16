import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountActions from 'store/modules/account';

import AccountPresenter from "components/account/AccountPresenter";

class AccountContainer extends Component {

    componentDidMount() {
        const { AccountActions } = this.props;
        let sessionId = localStorage.getItem('session_id');
        try {
            if(sessionId) {
                AccountActions.getAccountDetail(sessionId);
            }
        } catch(e) {
            console.log(e);
        }
    }

    componentDidUpdate(prevProps) {
        const { AccountActions, accountDetail } = this.props;

        let session_id = localStorage.getItem('session_id');
        let account_id = localStorage.getItem('account_id');
    
        if(accountDetail !== prevProps.accountDetail) {
            if(session_id) {
                AccountActions.getFavoriteMovies({account_id, session_id});
                AccountActions.getFavoriteTV({account_id, session_id});
                AccountActions.getRatedMovies({account_id, session_id});
                AccountActions.getRatedTV({account_id, session_id});
                AccountActions.getGenreList();
            }
        }
    }

    handleFavoriteBtn = (media_id) => {
        const { location: { pathname }, AccountActions } = this.props;
        let session_id = localStorage.getItem('session_id');
        let account_id = localStorage.getItem('account_id');
        let isTV = pathname.includes("/tv");
        let media_type = isTV ? 'tv' : 'movie';
        let favorite = false;
        try {
            AccountActions.markAsFavorite({account_id, session_id, media_type, media_id, favorite});    
        }catch(e) {
            console.log(e);
        }        
    }

    handleClearRating = (id) => {
        const { location: { pathname }, AccountActions } = this.props;
        let session_id = localStorage.getItem('session_id');
        let isTV = pathname.includes("/tv");

        if(isTV) {
            AccountActions.deleteRatingTV({id, session_id});
        } else  {
            AccountActions.deleteRatingMovies({id, session_id});
        }
    }

    handleRating = (id, rate) => {
        const { location: { pathname }, AccountActions } = this.props;
        let session_id = localStorage.getItem('session_id');
        let isTV = pathname.includes("/tv");

        if(isTV) {
            AccountActions.postRatingTV({id, rate, session_id});
        } else  {
            AccountActions.postRatingMovies({id, rate, session_id});
        }
    }

    render() {
        const { accountDetail, favoriteMovies, favoriteTV, ratedMovies, ratedTV, genreList, loading } = this.props;
        return(
            <AccountPresenter
                accountDetail={accountDetail}
                favoriteMovies={favoriteMovies}
                favoriteTV={favoriteTV}
                ratedMovies={ratedMovies}
                ratedTV={ratedTV}
                genreList={genreList}
                loading={loading}
                handleFavoriteBtn={this.handleFavoriteBtn}
                handleClearRating={this.handleClearRating}
                handleRating={this.handleRating}
            />
        );
    }
}

export default withRouter(connect(
    (state) => ({
        accountDetail: state.account.accountDetail,
        favoriteMovies: state.account.favoriteMovies,
        favoriteTV: state.account.favoriteTV,
        ratedMovies: state.account.ratedMovies,
        ratedTV: state.account.ratedTV,
        genreList: state.account.genreList,
        loading: state.loading['account/GET_ACCOUNT_DETAILS']
              || state.loading['account/GET_FAVORITE_MOVIES']
              || state.loading['account/GET_FAVORITE_TV']
              || state.loading['account/GET_RATED_MOVIES']
              || state.loading['account/GET_RATED_TV']
              || state.loading['account/GET_GENRE_LIST']
    }),
    (dispatch) => ({
        AccountActions: bindActionCreators(accountActions, dispatch)
    })
)(AccountContainer));