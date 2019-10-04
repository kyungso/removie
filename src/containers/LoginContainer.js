import React, { Component } from "react";
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from 'store/modules/login';

import LoginPresenter from "components/login/LoginPresenter";

class LoginContainer extends Component {

    async componentDidMount() {
        const { LoginActions } = this.props;
        LoginActions.getRequestToken();
    }

    updateUsername = (event) => {
        const { LoginActions } = this.props;
        const { value } = event.target; 
        LoginActions.changeUsername({value});
    }

    updatePassword = (event) => {
        const { LoginActions } = this.props;
        const { value } = event.target; 
        LoginActions.changePassword({value});
    }

    enterSubmit = (event) => {
        if(event.keyCode === 13){
            this.handleSubmit(event);
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password } = this.props;
        if(username !== "" && password !== "") {
            this.validateWithLogin();
        }
    };

    validateWithLogin = async () => {
        const { username, password, request_token, LoginActions, location } = this.props;
        
        try {
            LoginActions.validateWithLogin({username, password, request_token});
        } catch (e) {
            console.log(e);
        } 
    };

    render() {
        const { username, password, request_token, logged, loading } = this.props;
        console.log(request_token, username, password);
        console.log(logged);
        return(
            <LoginPresenter 
                username={username}
                password={password}
                request_token={request_token}
                logged={logged}
                loading={loading}
                handleSubmit={this.handleSubmit}
                updateUsername={this.updateUsername}
                updatePassword={this.updatePassword}
                enterSubmit={this.enterSubmit}
            />
        );
    }
}

export default withRouter(connect(
    (state) => ({
        username: state.login.get('username'),
        password: state.login.get('password'),
        request_token: state.login.get('request_token'),
        logged: state.login.get('logged'),
        loading: state.pender.pending['login/CHANGE_USERNAME'] || state.pender.pending['login/CHANGE_PASSWORD']
    }),
    (dispatch) => ({
        LoginActions: bindActionCreators(loginActions, dispatch)
    })
)(LoginContainer));