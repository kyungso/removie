import { createAction, handleActions }from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'store/createRequestSaga';

import { tvApi } from 'lib/api';

// action types
const [GET_TV_TOPRATED, GET_TV_TOPRATED_SUCCESS] = createRequestActionTypes(
    'tv/GET_TV_TOPRATED'
);
const [GET_TV_POPULAR, GET_TV_POPULAR_SUCCESS] = createRequestActionTypes(
    'tv/GET_TV_POPULAR'
);
const [GET_TV_AIRINGTODAY, GET_TV_AIRINGTODAY_SUCCESS] = createRequestActionTypes(
    'tv/GET_TV_AIRINGTODAY'
);

// action creators
export const getTvToprated = createAction(GET_TV_TOPRATED);
export const getTvPopular = createAction(GET_TV_POPULAR);
export const getTvAiringtoday = createAction(GET_TV_AIRINGTODAY);

// create saga
const getMovieNowplayingSaga = createRequestSaga(GET_TV_TOPRATED, tvApi.topRated);
const getMovieUpcomingSaga = createRequestSaga(GET_TV_POPULAR, tvApi.popular);
const getMoviePopularSaga = createRequestSaga(GET_TV_AIRINGTODAY, tvApi.airingToday);
export function* tvSaga() {
    yield takeLatest(GET_TV_TOPRATED, getMovieNowplayingSaga);
    yield takeLatest(GET_TV_POPULAR, getMovieUpcomingSaga);
    yield takeLatest(GET_TV_AIRINGTODAY, getMoviePopularSaga);
}

// initial state
const initialState = {
    topRated: null,
    popular: null,
    airingToday: null
};

// reducer
export default handleActions({
    [GET_TV_TOPRATED_SUCCESS]: (state, { payload: { results: topRated }}) => ({
        ...state,
        topRated: topRated
    }),
    [GET_TV_POPULAR_SUCCESS]: (state, { payload: { results: popular }}) => ({
        ...state,
        popular: popular
    }),
    [GET_TV_AIRINGTODAY_SUCCESS]: (state, { payload: { results: airingToday }}) => ({
        ...state,
        airingToday: airingToday
    })
}, initialState)