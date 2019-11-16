import { createAction, handleActions }from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'store/createRequestSaga';

import { accountApi } from 'lib/api';

// action types
// - account
const INITIALIZE = 'account/INITIALIZE';
const [GET_ACCOUNT_DETAILS, GET_ACCOUNT_DETAILS_SUCCESS] = createRequestActionTypes(
    'account/GET_ACCOUNT_DETAILS'
);

// - favorite
const [GET_FAVORITE_MOVIES, GET_FAVORITE_MOVIES_SUCCESS] = createRequestActionTypes(
    'account/GET_FAVORITE_MOVIES'
);
const [GET_FAVORITE_TV, GET_FAVORITE_TV_SUCCESS] = createRequestActionTypes(
    'account/GET_FAVORITE_TV'
);
const [MARK_AS_FAVORITE, MARK_AS_FAVORITE_SUCCESS] = createRequestActionTypes(
    'account/MARK_AS_FAVORITE'
);

// - rating
const [GET_GENRE_LIST, GET_GENRE_LIST_SUCCESS] = createRequestActionTypes(
    'account/GET_GENRE_LIST'
);
const [GET_RATED_MOVIES, GET_RATED_MOVIES_SUCCESS] = createRequestActionTypes(
    'account/GET_RATED_MOVIES'
);
const [GET_RATED_TV, GET_RATED_TV_SUCCESS] = createRequestActionTypes(
    'account/GET_RATED_TV'
);

const [DELETE_RATING_MOVIES, DELETE_RATING_MOVIES_SUCCESS] = createRequestActionTypes(
    'account/DELETE_RATING_MOVIES'
);
const [DELETE_RATING_TV, DELETE_RATING_TV_SUCCESS] = createRequestActionTypes(
    'account/DELETE_RATING_TV'
);
const [POST_RATING_MOVIES, POST_RATING_MOVIES_SUCCESS] = createRequestActionTypes(
    'account/POST_RATING_MOVIES'
);
const [POST_RATING_TV, POST_RATING_TV_SUCCESS] = createRequestActionTypes(
    'account/POST_RATING_TV'
);

// action creators
export const initialize = createAction(INITIALIZE);
export const getAccountDetail = createAction(GET_ACCOUNT_DETAILS);

export const getFavoriteMovies = createAction(GET_FAVORITE_MOVIES);
export const getFavoriteTV = createAction(GET_FAVORITE_TV);
export const markAsFavorite = createAction(MARK_AS_FAVORITE);

export const getGenreList = createAction(GET_GENRE_LIST);
export const getRatedMovies = createAction(GET_RATED_MOVIES);
export const getRatedTV = createAction(GET_RATED_TV);
export const deleteRatingMovies = createAction(DELETE_RATING_MOVIES);
export const deleteRatingTV = createAction(DELETE_RATING_TV);
export const postRatingMovies = createAction(POST_RATING_MOVIES);
export const postRatingTV = createAction(POST_RATING_TV);

// create saga
const getAccountDetailSaga = createRequestSaga(GET_ACCOUNT_DETAILS, accountApi.getAccountDetail);

const getFavoriteMoviesSaga = createRequestSaga(GET_FAVORITE_MOVIES, accountApi.getFavoriteMovies);
const getFavoriteTVSaga = createRequestSaga(GET_FAVORITE_TV, accountApi.getFavoriteTV);
const markAsFavoriteSaga = createRequestSaga(MARK_AS_FAVORITE, accountApi.markAsFavorite);

const getGenreListSaga = createRequestSaga(GET_GENRE_LIST, accountApi.getGenreList);
const getRatedMoviesSaga = createRequestSaga(GET_RATED_MOVIES, accountApi.getRatedMovies);
const getRatedTVSaga = createRequestSaga(GET_RATED_TV, accountApi.getRatedTV);
const deleteRatingMoviesSaga = createRequestSaga(DELETE_RATING_MOVIES, accountApi.deleteRatingMovies);
const deleteRatingTVSaga = createRequestSaga(DELETE_RATING_TV, accountApi.deleteRatingTV);
const postRatingMoviesSaga = createRequestSaga(POST_RATING_MOVIES, accountApi.postRatingMovies);
const postRatingTVSaga = createRequestSaga(POST_RATING_TV, accountApi.postRatingTV);
export function* accountSaga() {
    yield takeLatest(GET_ACCOUNT_DETAILS, getAccountDetailSaga);
    yield takeLatest(GET_FAVORITE_MOVIES, getFavoriteMoviesSaga);
    yield takeLatest(GET_FAVORITE_TV, getFavoriteTVSaga);
    yield takeLatest(MARK_AS_FAVORITE, markAsFavoriteSaga);
    yield takeLatest(GET_GENRE_LIST, getGenreListSaga);
    yield takeLatest(GET_RATED_MOVIES, getRatedMoviesSaga);
    yield takeLatest(GET_RATED_TV, getRatedTVSaga);
    yield takeLatest(DELETE_RATING_MOVIES, deleteRatingMoviesSaga);
    yield takeLatest(DELETE_RATING_TV, deleteRatingTVSaga);
    yield takeLatest(POST_RATING_MOVIES, postRatingMoviesSaga);
    yield takeLatest(POST_RATING_TV, postRatingTVSaga);
}

// initial state
const initialState = {
    accountDetail: null,
    favoriteMovies: null,
    favoriteTV: null,
    ratedMovies: null,
    ratedTV: null,
    genreList: null
};

// reducer
const account =  handleActions({
    [INITIALIZE]: state => initialState,
    [GET_ACCOUNT_DETAILS_SUCCESS]: (state, { payload: accountDetail }) => {
        localStorage.setItem('account_id', accountDetail.id);
        return {...state, accountDetail: accountDetail };
    },
    [GET_FAVORITE_MOVIES_SUCCESS]: (state, { payload: { results: favoriteMovies }}) => ({
        ...state,
        favoriteMovies: favoriteMovies
    }),
    [GET_FAVORITE_TV_SUCCESS]: (state, { payload: { results: favoriteTV }}) => ({
        ...state,
        favoriteTV: favoriteTV
    }),
    [GET_GENRE_LIST_SUCCESS]: (state, { payload: { genres: genreList }}) => ({
        ...state,
        genreList: genreList
    }),
    [GET_RATED_MOVIES_SUCCESS]: (state, { payload: { results: ratedMovies }}) => ({
        ...state,
        ratedMovies: ratedMovies
    }),
    [GET_RATED_TV_SUCCESS]: (state, { payload: { results: ratedTV }}) => ({
        ...state,
        ratedTV: ratedTV
    }),
    [MARK_AS_FAVORITE_SUCCESS]: (state, { meta }) => {
        return meta.media_type === "movie"
            ? {...state, favoriteMovies: state.favoriteMovies.filter(movie => movie.id !== meta.media_id)}
            : {...state, favoriteTV: state.favoriteTV.filter(tv => tv.id !== meta.media_id)}
    },
    [DELETE_RATING_MOVIES_SUCCESS]: (state, { meta }) => ({
        ...state,
        ratedMovies: state.ratedMovies.filter(movie => movie.id !== meta.id)
    }),
    [DELETE_RATING_TV_SUCCESS]: (state, { meta }) => ({
        ...state,
        ratedTV: state.ratedTV.filter(tv => tv.id !== meta.id)
    }),
    [POST_RATING_MOVIES_SUCCESS]: (state, { meta }) => {
        let index = state.ratedMovies.findIndex(movie => movie.id === meta.id);
        return {...state, 
                ratedMovies: state.ratedMovies.map((movie, idx) => 
                    index === idx ? {...movie, rating: meta.rate} : movie
                ) 
        };
    },
    [POST_RATING_TV_SUCCESS]: (state, { meta }) => {
        let index = state.ratedTV.findIndex(tv => tv.id === meta.id);
        return {...state, 
                ratedTV: state.ratedTV.map((tv, idx) => 
                    index === idx ? {...tv, rating: meta.rate} : tv
                ) 
        };
    }
}, initialState);

export default account;