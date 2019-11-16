import { createAction, handleActions }from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'store/createRequestSaga';

import { moviesApi, tvApi } from 'lib/api';

// action types
const [GET_MOVIE_TRENDING, GET_MOVIE_TRENDING_SUCCESS] = createRequestActionTypes(
        'home/GET_MOVIE_TRENDING'
);
const [GET_TV_TRENDING, GET_TV_TRENDING_SUCCESS] = createRequestActionTypes(
        'home/GET_TV_TRENDING'
);
const [GET_TOPRATED, GET_TOPRATED_SUCCESS] = createRequestActionTypes(
        'home/GET_TOPRATED'
);

// action creators
export const getMovieTrending = createAction(GET_MOVIE_TRENDING);
export const getTvTrending = createAction(GET_TV_TRENDING);
export const getTopRated = createAction(GET_TOPRATED);

// create saga
const getMovieTrendingSaga = createRequestSaga(GET_MOVIE_TRENDING, moviesApi.trending);
const getTvTrendingSaga = createRequestSaga(GET_TV_TRENDING, tvApi.trending);
const getTopRatedSaga = createRequestSaga(GET_TOPRATED, moviesApi.topRated);
export function* homeSaga() {
    yield takeLatest(GET_MOVIE_TRENDING, getMovieTrendingSaga);
    yield takeLatest(GET_TV_TRENDING, getTvTrendingSaga);
    yield takeLatest(GET_TOPRATED, getTopRatedSaga);
}

// initial state
const initialState = {
    movieTrending: null,
    tvTrending: null,
    topRated: null
};

// reducer
const home = handleActions({
    [GET_MOVIE_TRENDING_SUCCESS] : (state, { payload: { results: movieTrending }}) => ({
        ...state,
        movieTrending: movieTrending
    }),
    [GET_TV_TRENDING_SUCCESS] : (state, { payload: { results: tvTrending }}) => ({
        ...state,
        tvTrending: tvTrending
    }),
    [GET_TOPRATED_SUCCESS] : (state, { payload: { results: topRated }}) => ({
        ...state,
        topRated: topRated
    })
}, initialState);

export default home;