import { createAction, handleActions }from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'store/createRequestSaga';

import { loginApi } from 'lib/api';

// action types
const INITIALIZE = 'login/INITIALIZE';
const CHANGE_FIELD = 'login/CHANGE_FIELD';
const [GET_REQUEST_TOKEN, GET_REQUEST_TOKEN_SUCCESS] = createRequestActionTypes(
    'login/GET_REQUEST_TOKEN'
);
const [VALIDATE_WITH_LOGIN, VALIDATE_WITH_LOGIN_SUCCESS, VALIDATE_WITH_LOGIN_FAILURE] = createRequestActionTypes(
    'login/VALIDATE_WITH_LOGIN'
);
const [CREATE_SESSION_ID, CREATE_SESSION_ID_SUCCESS] = createRequestActionTypes(
    'login/CREATE_SESSION_ID'
);
const [DELETE_SESSION_ID, DELETE_SESSION_ID_SUCCESS] = createRequestActionTypes(
    'login/DELETE_SESSION_ID'
);

// action creators
export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({ key, value }));
export const getRequestToken = createAction(GET_REQUEST_TOKEN);
export const validateWithLogin = createAction(VALIDATE_WITH_LOGIN);
export const createSessionId = createAction(CREATE_SESSION_ID);
export const deleteSessionId = createAction(DELETE_SESSION_ID);

// create saga
const getRequestTokenSaga = createRequestSaga(GET_REQUEST_TOKEN, loginApi.createRequetToken);
const validateWithLoginSaga = createRequestSaga(VALIDATE_WITH_LOGIN, loginApi.validateWithLogin);
const createSessionIdSaga = createRequestSaga(CREATE_SESSION_ID, loginApi.createSessionId);
const deleteSessionIdSaga = createRequestSaga(DELETE_SESSION_ID, loginApi.deleteSessionId);
export function* loginSaga() {
    yield takeLatest(GET_REQUEST_TOKEN, getRequestTokenSaga);
    yield takeLatest(VALIDATE_WITH_LOGIN, validateWithLoginSaga);
    yield takeLatest(CREATE_SESSION_ID, createSessionIdSaga);
    yield takeLatest(DELETE_SESSION_ID, deleteSessionIdSaga);
}

// initial state
const initialState = {
    request_token: null,
    session_id: null,
    username: '',
    password: '',
    logged: false
};

// reducer
const login = handleActions({
    [INITIALIZE]: state => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
        ...state,
        [key]: value
    }),
    [GET_REQUEST_TOKEN_SUCCESS]: (state, { payload: { request_token } }) => {
        localStorage.setItem('logged', false);
        localStorage.setItem('token', request_token);
        return {...state, request_token: request_token };
    },
    [VALIDATE_WITH_LOGIN_SUCCESS]: (state, { payload: { success }}) => {
        localStorage.setItem('logged', success);
        return {...state, logged: success };
    },
    [VALIDATE_WITH_LOGIN_FAILURE]: state => {
        alert('다시 로그인해주세요');
        return {...state, username: '', password: '', logged: false };
    },
    [CREATE_SESSION_ID_SUCCESS]: (state, { payload: { session_id }}) => {
        localStorage.setItem('session_id', session_id);
        window.location.href = '#/';
        return {...state, session_id: session_id };
    },
    [DELETE_SESSION_ID_SUCCESS]: state => initialState,
}, initialState);

export default login;