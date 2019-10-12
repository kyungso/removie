import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from 'store/modules/login';

import AccountPresenter from "components/account/AccountPresenter";

class AccountContainer extends Component {

    async componentDidMount() {
        const { LoginActions } = this.props;
        let token = localStorage.getItem('token');
        let sessionId = localStorage.getItem('session_id');
        try {
            if(!sessionId) {
                LoginActions.createSessionId(token);
            }
        } catch(e) {
            console.log(e);
        }
    }

    handleLogout = async () => {
        const { LoginActions } = this.props;
        try {
            let sessionId = localStorage.getItem('session_id');
            await LoginActions.deleteSessionId(sessionId);
            await LoginActions.initialize();
            window.location.replace(`https://removie.netlify.com`);
        } catch(e) {
            console.log(e);
        }
    };

    render() {

        return(
           <AccountPresenter
                handleLogout={this.handleLogout}
           />
        );
    }
}

export default withRouter(connect(
    (state) => ({
        session_id: state.login.get('session_id'),
        logged: state.login.get('logged'),
        loading: state.pender.pending['login/GET_REQUEST_TOKEN'] || state.pender.pending['login/VALIDATE_WITH_LOGIN'] || state.pender.pending['login/CREATE_SESSION_ID'],
    }),
    (dispatch) => ({
        LoginActions: bindActionCreators(loginActions, dispatch)
    })
)(AccountContainer));