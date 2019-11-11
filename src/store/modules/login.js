import { createAction, handleActions }from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

import { loginApi } from 'lib/api';

// action types
const INITIALIZE = 'login/INITIALIZE';
const CHANGE_USERNAME = 'login/CHANGE_USERNAME';
const CHANGE_PASSWORD = 'login/CHANGE_PASSWORD';
const GET_REQUEST_TOKEN = 'login/GET_REQUEST_TOKEN';
const ASK_USER_FOR_PERMISSION = 'login/ASK_USER_FOR_PERMISSION';
const VALIDATE_WITH_LOGIN = 'login/VALIDATE_WITH_LOGIN';
const CREATE_SESSION_ID = 'login/CREATE_SESSION_ID';
const DELETE_SESSION_ID = 'login/DELETE_SESSION_ID';

// action creators
export const initialize = createAction(INITIALIZE);
export const changeUsername = createAction(CHANGE_USERNAME);
export const changePassword = createAction(CHANGE_PASSWORD);
export const getRequestToken = createAction(GET_REQUEST_TOKEN, loginApi.createRequetToken);
export const askUserForPermission = createAction(ASK_USER_FOR_PERMISSION);
export const validateWithLogin = createAction(VALIDATE_WITH_LOGIN, loginApi.validateWithLogin);
export const createSessionId = createAction(CREATE_SESSION_ID, loginApi.createSessionId);
export const deleteSessionId = createAction(DELETE_SESSION_ID, loginApi.deleteSessionId);

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
    [INITIALIZE]: (state, action) => initialState,
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
            localStorage.setItem('logged', false);
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
        },
        onFailure: (state, action) => { // 오류가 발생할 때
            state.set('username', '');
            state.set('password', '');
            localStorage.setItem('logged', false);
            state.set('logged', false);
            return alert('다시 로그인해주세요') & window.location.reload();
        }
    }),
    ...pender({
        type: CREATE_SESSION_ID,
        onSuccess: (state, action) => {
            const { session_id } = action.payload.data;
            localStorage.setItem('session_id', session_id);
            window.location.href = '#/';
            return state.set('session_id', session_id);
        },
    }),
    ...pender({
        type: DELETE_SESSION_ID,
        onSuccess: (state, action) => {
            return localStorage.clear();
        },
    })
}, initialState)