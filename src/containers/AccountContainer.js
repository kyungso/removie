import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountActions from 'store/modules/account';

import AccountPresenter from "components/account/AccountPresenter";
import Loader from "components/common/Loader";

class AccountContainer extends Component {

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
        // pathname이 각각 favorite이거나 rated일 때 되는 걸로 수정
        // if(prevProps.location !== this.props.location) {}
        if(accountDetail !== prevProps.accountDetail) {
            if(sessionId) {
                AccountActions.getFavoriteMovies(accountId, sessionId);
                AccountActions.getFavoriteTV(accountId, sessionId);
                AccountActions.getRatedMovies(accountId, sessionId);
                AccountActions.getRatedTV(accountId, sessionId);
            }
        }

        let query = queryString.parse(location.search);
        let media_type = query.media_type;
        let media_id = query.media_id;
        let favorite = query.favorite;
        if(query && Object.keys(query).length !== 0) {
            await AccountActions.markAsFavorite(accountId, sessionId, {media_type, media_id, favorite});
        }
    }

    render() {
        const { accountDetail, favoriteMovies, favoriteTV, ratedMovies, ratedTV, loading } = this.props;
        return(
           <>
           {loading
            ? <Loader />
            : accountDetail && <AccountPresenter
                accountDetail={accountDetail}
                favoriteMovies={favoriteMovies}
                favoriteTV={favoriteTV}
                ratedMovies={ratedMovies}
                ratedTV={ratedTV}
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
        ratedMovies: state.account.get('ratedMovies'),
        ratedTV: state.account.get('ratedTV'),
        loading: state.pender.pending['account/GET_ACCOUNT_DETAILS'] || state.pender.pending['account/GET_FAVORITE_MOVIES'] || state.pender.pending['account/GET_FAVORITE_TV'] || state.pender.pending['account/GET_RATED_MOVIES'] || state.pender.pending['account/GET_RATED_TV']
    }),
    (dispatch) => ({
        AccountActions: bindActionCreators(accountActions, dispatch)
    })
)(AccountContainer));