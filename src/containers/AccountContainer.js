import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountActions from 'store/modules/account';

import AccountPresenter from "components/account/AccountPresenter";
import Loader from "components/common/Loader";

class AccountContainer extends Component {

    // constructor(props) {
    //     super(props);
        
    //     let { location, AccountActions } = this.props;
    //     let query = queryString.parse(location.search)
    //     let media_type = query.media_type;
    //     let media_id = query.media_id;
    //     let favorite = query.favorite;

    //     let sessionId = localStorage.getItem('session_id');
    //     let accountId = localStorage.getItem('accountId');
    //     if(query && Object.keys(query).length !== 0) {
    //         AccountActions.markAsFavorite(accountId, sessionId, {media_type, media_id, favorite});
    //         this.props.history.push("/account/favorite");
    //         // AccountActions.getFavoriteMovies(accountId, sessionId);
    //         // AccountActions.getFavoriteTV(accountId, sessionId);
    //     } else {
    //         AccountActions.getFavoriteMovies(accountId, sessionId);
    //         AccountActions.getFavoriteTV(accountId, sessionId);
    //     }
    // }

    async componentDidMount() {
        
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

    async componentDidUpdate(prevProps) {
        const { location, AccountActions, accountDetail } = this.props;

        let sessionId = localStorage.getItem('session_id');
        let accountId = localStorage.getItem('accountId');

        if(accountDetail !== prevProps.accountDetail) {
            if(sessionId) {
                AccountActions.getFavoriteMovies(accountId, sessionId);
                AccountActions.getFavoriteTV(accountId, sessionId);
            }
        }

        let query = queryString.parse(location.search);
        let media_type = query.media_type;
        let media_id = query.media_id;
        let favorite = query.favorite;
        if(query && Object.keys(query).length !== 0) {
            AccountActions.markAsFavorite(accountId, sessionId, {media_type, media_id, favorite});
            this.props.history.push("/account/favorite");
        }
    }

    // handleMarkFavorite = async ({media_type, media_id, favorite}) => {
    //     const { AccountActions, accountDetail } = this.props;
    //     console.log(media_type, media_id, favorite);
    //     try {
    //         let sessionId = localStorage.getItem('session_id');
    //         let account_id = accountDetail.id;
    //         if(sessionId) {
    //             await AccountActions.markAsFavorite(account_id, sessionId, {media_type, media_id, favorite});
    //             AccountActions.getFavoriteMovies(account_id, sessionId);
    //             AccountActions.getFavoriteTV(account_id, sessionId);
    //         }
    //     } catch(e) {
    //         console.log(e);
    //     }
    // };

    render() {
        const { accountDetail, favoriteMovies, favoriteTV, loading } = this.props;
        return(
           <>
           {loading
            ? <Loader />
            : accountDetail && <AccountPresenter
                accountDetail={accountDetail}
                favoriteMovies={favoriteMovies}
                favoriteTV={favoriteTV}
                loading={loading}
              />
            }
           </>
        );
    }
}

export default withRouter(connect(
    (state) => ({
        accountDetail: state.account.get('accountDetail'),
        favoriteMovies: state.account.get('favoriteMovies'),
        favoriteTV: state.account.get('favoriteTV'),
        loading: state.pender.pending['account/GET_ACCOUNT_DETAILS'] || state.pender.pending['account/GET_FAVORITE_MOVIES'] || state.pender.pending['account/GET_FAVORITE_TV'] || state.pender.pending['account/MARK_AS_FAVORITE']
    }),
    (dispatch) => ({
        AccountActions: bindActionCreators(accountActions, dispatch)
    })
)(AccountContainer));