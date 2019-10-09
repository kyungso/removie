import React, { Component } from "react";
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
        const { username, password, LoginActions } = this.props;
        if(username !== "" && password !== "") {
            LoginActions.askUserForPermission();
            // //this.validateWithLogin();
        }
    };

    validateWithLogin = async () => {
        const { username, password, request_token, LoginActions } = this.props;
        
        try {
            await LoginActions.validateWithLogin({username, password, request_token});
        } catch (e) { 
            console.log(e);
        }
    };

    createSessionId = async () => {
        const { LoginActions } = this.props;
        let token = localStorage.getItem('token');
        try {
            LoginActions.createSessionId({token});
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { username, password, request_token, logged, loading } = this.props;
        console.log(request_token, username, password, logged);
        
        return(
            <LoginPresenter 
                username={username}
                password={password}
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
        loading: state.pender.pending['login/GET_REQUEST_TOKEN'] || state.pender.pending['login/VALIDATE_WITH_LOGIN'] || state.pender.pending['login/CREATE_SESSION_ID'],
    }),
    (dispatch) => ({
        LoginActions: bindActionCreators(loginActions, dispatch)
    })
)(LoginContainer));