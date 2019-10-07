import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from 'store/modules/login';

import LoginPresenter from "components/login/LoginPresenter";

class LoginContainer extends Component {

    async componentDidMount() {
        const { LoginActions } = this.props;
        // const logged = localStorage.getItem('logged');
        // const request_token = localStorage.getItem('token');
        
        // if(logged) {
        //     LoginActions.createSessionId({request_token});
        // } else {
        //     LoginActions.getRequestToken();
        // } 이거 home 페이지에 !!
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
        const { username, password, history } = this.props;
        if(username !== "" && password !== "") {
            //history.push('/permission');
            this.validateWithLogin();
            //history.push('/permission');
        }
    };

    validateWithLogin = async () => {
        const { username, password, request_token, LoginActions } = this.props;
        
        try {
            LoginActions.validateWithLogin({username, password, request_token});
            window.location.replace(`https://www.themoviedb.org/authenticate/${request_token}?redirect_to=https://peaceful-noyce-3ec9f1.netlify.com/#/`);
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
        
        // if(logged === true) {
        //     this.createSessionId();
        // }

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
            // <LoginPresenter 
            //     username={username}
            //     password={password}
            //     request_token={request_token}
            //     logged={logged}
            //     loading={loading}
            //     handleSubmit={this.handleSubmit}
            //     updateUsername={this.updateUsername}
            //     updatePassword={this.updatePassword}
            //     enterSubmit={this.enterSubmit}
            // />
        );
    }
}

export default withRouter(connect(
    (state) => ({
        username: state.login.get('username'),
        password: state.login.get('password'),
        request_token: state.login.get('request_token'),
        session_id: state.login.get('session_id'),
        logged: state.login.get('logged'),
        loading: state.pender.pending['login/GET_REQUEST_TOKEN'] || state.pender.pending['login/VALIDATE_WITH_LOGIN'] || state.pender.pending['login/CREATE_SESSION_ID']
    }),
    (dispatch) => ({
        LoginActions: bindActionCreators(loginActions, dispatch)
    })
)(LoginContainer));