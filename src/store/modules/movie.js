import { createAction, handleActions }from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'store/createRequestSaga';

import { moviesApi } from 'lib/api';

// action types
const [GET_MOVIE_NOWPLAYING, GET_MOVIE_NOWPLAYING_SUCCESS] = createRequestActionTypes(
    'movie/GET_MOVIE_NOWPLAYING'
);
const [GET_MOVIE_UPCOMING, GET_MOVIE_UPCOMING_SUCCESS] = createRequestActionTypes(
    'movie/GET_MOVIE_UPCOMING'
);
const [GET_MOVIE_POPULAR, GET_MOVIE_POPULAR_SUCCESS] = createRequestActionTypes(
    'movie/GET_MOVIE_POPULAR'
);

// action creators
export const getMovieNowplaying = createAction(GET_MOVIE_NOWPLAYING);
export const getMovieUpcoming = createAction(GET_MOVIE_UPCOMING);
export const getMoviePopular = createAction(GET_MOVIE_POPULAR);

// create saga
const getMovieNowplayingSaga = createRequestSaga(GET_MOVIE_NOWPLAYING, moviesApi.nowPlaying);
const getMovieUpcomingSaga = createRequestSaga(GET_MOVIE_UPCOMING, moviesApi.upcoming);
const getMoviePopularSaga = createRequestSaga(GET_MOVIE_POPULAR, moviesApi.popular);
export function* movieSaga() {
    yield takeLatest(GET_MOVIE_NOWPLAYING, getMovieNowplayingSaga);
    yield takeLatest(GET_MOVIE_UPCOMING, getMovieUpcomingSaga);
    yield takeLatest(GET_MOVIE_POPULAR, getMoviePopularSaga);
}

// initial state
const initialState = {
    nowPlaying: null,
    upcoming: null,
    popular: null
};

// reducer
const movie =  handleActions({
    [GET_MOVIE_NOWPLAYING_SUCCESS]: (state, { payload: { results: nowPlaying }}) => ({
        ...state,
        nowPlaying: nowPlaying
    }),
    [GET_MOVIE_UPCOMING_SUCCESS]: (state, { payload: { results: upcoming }}) => ({
        ...state,
        upcoming: upcoming
    }),
    [GET_MOVIE_POPULAR_SUCCESS]: (state, { payload: { results: popular }}) => ({
        ...state,
        popular: popular
    }),
}, initialState);

export default movie;