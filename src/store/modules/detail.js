import { createAction, handleActions }from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'store/createRequestSaga';

import { moviesApi, tvApi, accountApi } from 'lib/api';

// action types
const [GET_MOVIE_DETAIL, GET_MOVIE_DETAIL_SUCCESS] = createRequestActionTypes(
    'detail/GET_MOVIE_DETAIL'
);
const [GET_MOVIE_ACCOUNT_STATE, GET_MOVIE_ACCOUNT_STATE_SUCCESS] = createRequestActionTypes(
    'detail/GET_MOVIE_ACCOUNT_STATE'
);
const [GET_MOVIE_IMDB_ID, GET_MOVIE_IMDB_ID_SUCCESS] = createRequestActionTypes(
    'detail/GET_MOVIE_IMDB_ID'
);
const [GET_MOVIE_VIDEOS, GET_MOVIE_VIDEOS_SUCCESS] = createRequestActionTypes(
    'detail/GET_MOVIE_VIDEOS'
);

const [GET_TV_DETAIL, GET_TV_DETAIL_SUCCESS] = createRequestActionTypes(
    'detail/GET_TV_DETAIL'
);
const [GET_TV_ACCOUNT_STATE, GET_TV_ACCOUNT_STATE_SUCCESS] = createRequestActionTypes(
    'detail/GET_TV_ACCOUNT_STATE'
);
const [GET_TV_IMDB_ID, GET_TV_IMDB_ID_SUCCESS] = createRequestActionTypes(
    'detail/GET_TV_IMDB_ID'
);
const [GET_TV_VIDEOS, GET_TV_VIDEOS_SUCCESS] = createRequestActionTypes(
    'detail/GET_TV_VIDEOS'
);

const [MARK_AS_FAVORITE, MARK_AS_FAVORITE_SUCCESS] = createRequestActionTypes(
    'detail/MARK_AS_FAVORITE'
);
const [DELETE_RATING_MOVIES, DELETE_RATING_MOVIES_SUCCESS] = createRequestActionTypes(
    'detail/DELETE_RATING_MOVIES'
);
const [DELETE_RATING_TV, DELETE_RATING_TV_SUCCESS] = createRequestActionTypes(
    'detail/DELETE_RATING_TV'
);
const [POST_RATING_MOVIES, POST_RATING_MOVIES_SUCCESS] = createRequestActionTypes(
    'detail/POST_RATING_MOVIES'
);
const [POST_RATING_TV, POST_RATING_TV_SUCCESS] = createRequestActionTypes(
    'detail/POST_RATING_TV'
);
const UNLOAD_DETAIL = 'detail/UNLOAD_DETAIL';

// action creators
export const getMovieDetail = createAction(GET_MOVIE_DETAIL);
export const getMovieAccountState = createAction(GET_MOVIE_ACCOUNT_STATE);
export const getMovieImdbId = createAction(GET_MOVIE_IMDB_ID);
export const getMovieVideos = createAction(GET_MOVIE_VIDEOS);

export const getTvDetail = createAction(GET_TV_DETAIL);
export const getTvAccountState = createAction(GET_TV_ACCOUNT_STATE);
export const getTvImdbId = createAction(GET_TV_IMDB_ID);
export const getTvVideos = createAction(GET_TV_VIDEOS);

export const markAsFavorite = createAction(MARK_AS_FAVORITE);
export const deleteRatingMovies = createAction(DELETE_RATING_MOVIES);
export const deleteRatingTV = createAction(DELETE_RATING_TV);
export const postRatingMovies = createAction(POST_RATING_MOVIES);
export const postRatingTV = createAction(POST_RATING_TV);

export const unloadDetail = createAction(UNLOAD_DETAIL);

// create saga
const getMovieDetailSaga = createRequestSaga(GET_MOVIE_DETAIL, moviesApi.movieDetail);
const getMovieAccountStateSaga = createRequestSaga(GET_MOVIE_ACCOUNT_STATE, moviesApi.movieAccountState);
const getMovieImdbIdSaga = createRequestSaga(GET_MOVIE_IMDB_ID, moviesApi.movieFindImdbId);
const getMovieVideosSaga = createRequestSaga(GET_MOVIE_VIDEOS, moviesApi.movieVideos);

const getTvDetailSaga = createRequestSaga(GET_TV_DETAIL, tvApi.showDetail);
const getTvAccountStateSaga = createRequestSaga(GET_TV_ACCOUNT_STATE, tvApi.showAccountState);
const getTvImdbIdSaga = createRequestSaga(GET_TV_IMDB_ID, tvApi.showFindImdbId);
const getTvVideosSaga = createRequestSaga(GET_TV_VIDEOS, tvApi.showVideos);

const markAsFavoriteSaga = createRequestSaga(MARK_AS_FAVORITE, accountApi.markAsFavorite);
const deleteRatingMoviesSaga = createRequestSaga(DELETE_RATING_MOVIES, accountApi.deleteRatingMovies);
const deleteRatingTVSaga = createRequestSaga(DELETE_RATING_TV, accountApi.deleteRatingTV);
const postRatingMoviesSaga = createRequestSaga(POST_RATING_MOVIES, accountApi.postRatingMovies);
const postRatingTVSaga = createRequestSaga(POST_RATING_TV, accountApi.postRatingTV);
export function* detailSaga() {
    yield takeLatest(GET_MOVIE_DETAIL, getMovieDetailSaga);
    yield takeLatest(GET_MOVIE_ACCOUNT_STATE, getMovieAccountStateSaga);
    yield takeLatest(GET_MOVIE_IMDB_ID, getMovieImdbIdSaga);
    yield takeLatest(GET_MOVIE_VIDEOS, getMovieVideosSaga);
    yield takeLatest(GET_TV_DETAIL, getTvDetailSaga);
    yield takeLatest(GET_TV_ACCOUNT_STATE, getTvAccountStateSaga);
    yield takeLatest(GET_TV_IMDB_ID, getTvImdbIdSaga);
    yield takeLatest(GET_TV_VIDEOS, getTvVideosSaga);
    yield takeLatest(MARK_AS_FAVORITE, markAsFavoriteSaga);
    yield takeLatest(DELETE_RATING_MOVIES, deleteRatingMoviesSaga);
    yield takeLatest(DELETE_RATING_TV, deleteRatingTVSaga);
    yield takeLatest(POST_RATING_MOVIES, postRatingMoviesSaga);
    yield takeLatest(POST_RATING_TV, postRatingTVSaga);
    
}

// initial state
const initialState = {
    result: null,
    account_state: null,
    imdb_id: null,
    videos: null,
};

// reducer
const detail =  handleActions({
    [GET_MOVIE_DETAIL_SUCCESS]: (state, { payload: result }) => ({ 
        ...state,
        result: result
    }),
    [GET_MOVIE_ACCOUNT_STATE_SUCCESS]: (state, { payload: account_state }) => ({
        ...state,
        account_state: account_state
    }),
    [GET_MOVIE_IMDB_ID_SUCCESS]: (state, { payload: imdb_id }) => ({
        ...state,
        imdb_id: imdb_id
    }),
    [GET_MOVIE_VIDEOS_SUCCESS]: (state, { payload: videos }) => ({
        ...state,
        videos: videos
    }),
    [GET_TV_DETAIL_SUCCESS]: (state, { payload: result }) => ({
        ...state,
        result: result
    }),
    [GET_TV_ACCOUNT_STATE_SUCCESS]: (state, { payload: account_state }) => ({
        ...state,
        account_state: account_state
    }),
    [GET_TV_IMDB_ID_SUCCESS]: (state, { payload: imdb_id }) => ({
        ...state,
        imdb_id: imdb_id
    }),
    [GET_TV_VIDEOS_SUCCESS]: (state, { payload: videos }) => ({
        ...state,
        videos: videos
    }),

    [MARK_AS_FAVORITE_SUCCESS]: (state, { meta }) => ({
        ...state,
        account_state: {...state.account_state, favorite: meta.favorite}
    }),
    [DELETE_RATING_MOVIES_SUCCESS]: (state) => ({
        ...state,
        account_state: {...state.account_state, rated: false}
    }),
    [DELETE_RATING_TV_SUCCESS]: (state) => ({
        ...state,
        account_state: {...state.account_state, rated: false}
    }),
    [POST_RATING_MOVIES_SUCCESS]: (state, { meta }) => ({
        ...state,
        account_state: {...state.account_state, rated: { value: meta.rate }}
    }),
    [POST_RATING_TV_SUCCESS]: (state, { meta }) => ({
        ...state,
        account_state: {...state.account_state, rated: { value: meta.rate }}
    }),
    [UNLOAD_DETAIL]: () => initialState,
}, initialState);

export default detail;