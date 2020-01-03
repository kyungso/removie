import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from 'store/modules/login';
import * as accountActions from 'store/modules/account';

import Header from "components/common/Header";

class HeaderContainer extends Component {

    componentDidUpdate(prevProps) {
        let logged = localStorage.getItem('logged')
        let token = localStorage.getItem('token');
        let session_id = localStorage.getItem('session_id');
        const { LoginActions } = this.props;

        if(this.props.logged !== prevProps.logged) {
            try {
                if(logged === 'true' && !session_id) {
                    LoginActions.createSessionId(token);
                }
            } catch(e) {
                console.log(e);
            }
        }
    }

    handleLogout = () => {
        const { LoginActions, AccountActions } = this.props;
        try {
            let session_id = localStorage.getItem('session_id');
            LoginActions.deleteSessionId(session_id);
            LoginActions.initialize();
            AccountActions.initialize();
            localStorage.clear();
            window.location.href = '/';
        } catch(e) {
            console.log(e);
        }
    };
    

    render() {
        return(
           <Header handleLogout={this.handleLogout} />
        );
    }
}

export default withRouter(connect(
    (state) => ({
        username: state.login.username,
        session_id: state.login.session_id,
        logged: state.login.logged,
        accountDetail: state.account.accountDetail
    }),
    (dispatch) => ({
        LoginActions: bindActionCreators(loginActions, dispatch),
        AccountActions: bindActionCreators(accountActions, dispatch)
    })
)(HeaderContainer));