import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

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
        const { AccountActions, accountDetail } = this.props;

        if(accountDetail !== prevProps.accountDetail) {
            let sessionId = localStorage.getItem('session_id');
            let account_id = accountDetail.id;
            if(sessionId) {
                AccountActions.getFavoriteMovies(account_id, sessionId);
                AccountActions.getFavoriteTV(account_id, sessionId);
            }
        }
    }

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
        loading: state.pender.pending['account/GET_ACCOUNT_DETAILS'] || state.pender.pending['account/GET_FAVORITE_MOVIES'] || state.pender.pending['account/GET_FAVORITE_TV']
    }),
    (dispatch) => ({
        AccountActions: bindActionCreators(accountActions, dispatch)
    })
)(AccountContainer));