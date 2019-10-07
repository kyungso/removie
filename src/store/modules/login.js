import { createAction, handleActions }from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

import { loginApi } from 'lib/api';

// action types
const CHANGE_USERNAME = 'login/CHANGE_USERNAME';
const CHANGE_PASSWORD = 'login/CHANGE_PASSWORD';
const GET_REQUEST_TOKEN = 'login/GET_REQUEST_TOKEN';
const VALIDATE_WITH_LOGIN = 'login/VALIDATE_WITH_LOGIN';
const CREATE_SESSION_ID = 'login/CREATE_SESSION_ID';

// action creators
export const changeUsername = createAction(CHANGE_USERNAME);
export const changePassword = createAction(CHANGE_PASSWORD);
export const getRequestToken = createAction(GET_REQUEST_TOKEN, loginApi.createRequetToken);
export const validateWithLogin = createAction(VALIDATE_WITH_LOGIN, loginApi.validateWithLogin);
export const createSessionId = createAction(CREATE_SESSION_ID, loginApi.createSessionId);

// initial state
const initialState = Map({
    request_token: null,
    session_id: null,
    username: '',
    password: '',
    logged: false,
    loading: true
});

// reducer
export default handleActions({
    [CHANGE_USERNAME]: (state, action) => {
        const { value } = action.payload;
        return state.set('username', value);
    },
    [CHANGE_PASSWORD]: (state, action) => {
        const { value } = action.payload;
        return state.set('password', value);
    },
    ...pender({
        type: GET_REQUEST_TOKEN,
        onSuccess: (state, action) => {
            const { request_token } = action.payload.data;
            localStorage.setItem('token', request_token);
            return state.set('request_token', request_token);
        }
    }),
    ...pender({
        type: VALIDATE_WITH_LOGIN,
        onSuccess: (state, action) => {
            const { success } = action.payload.data;
            localStorage.setItem('logged', success);
            return state.set('logged', success);
        }
    }),
    ...pender({
        type: CREATE_SESSION_ID,
        onSuccess: (state, action) => {
            const { session_id } = action.payload.data;
            return state.set('session_id', session_id);
        }
    })
}, initialState)