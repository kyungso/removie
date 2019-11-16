import React, { Component } from "react";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from 'store/modules/login';

import LoginPresenter from "components/login/LoginPresenter";

class LoginContainer extends Component {

    componentDidMount() {
        const { LoginActions, logged } = this.props;
        LoginActions.initialize();
        if(!logged) {
            LoginActions.getRequestToken();
        }
    }

    updateField = ({ key, value }) => {
        const { LoginActions } = this.props;
        LoginActions.changeField({ key, value });
    }

    enterSubmit = (event) => {
        if(event.keyCode === 13){
            this.handleSubmit(event);
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { username, password } = this.props;
        if(username !== "" && password !== "") {
            this.validateWithLogin();
        }
    };

    validateWithLogin = async () => {
        const { username, password, LoginActions } = this.props;
        try {	
            localStorage.setItem('username', username);
            let request_token = localStorage.getItem('token');
            await LoginActions.validateWithLogin({username, password, request_token});	
        } catch (e) { 	
            console.log(e);	
        }	
    };

    render() {
        const { username, password } = this.props;

        return(
            <LoginPresenter 
                username={username}
                password={password}
                handleSubmit={this.handleSubmit}
                updateField={this.updateField}
                enterSubmit={this.enterSubmit}
            />
        );
    }
}

export default connect(
    (state) => ({
        username: state.login.username,
        password: state.login.password,
        request_token: state.login.request_token,
        logged: state.login.logged
    }),
    (dispatch) => ({
        LoginActions: bindActionCreators(loginActions, dispatch)
    })
)(LoginContainer);