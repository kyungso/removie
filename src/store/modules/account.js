import { createAction, handleActions }from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

import { accountApi } from 'lib/api';

// action types
const GET_ACCOUNT_DETAILS = 'account/GET_ACCOUNT_DETAILS';
const GET_FAVORITE_MOVIES = 'account/GET_FAVORITE_MOVIES';
const GET_FAVORITE_TV = 'account/GET_FAVORITE_TV';
const MARK_AS_FAVORITE = 'account/MARK_AS_FAVORITE';
const GET_RATED_MOVIES = 'account/GET_RATED_MOVIES';
const GET_RATED_TV = 'account/GET_RATED_TV';
const GET_GENRE_LIST = 'account/GET_GENRE_LIST';
const DELETE_RATING_MOVIES = 'account/DELETE_RATING_MOVIES';
const DELETE_RATING_TV = 'account/DELETE_RATING_TV';

// action creators
export const getAccountDetail = createAction(GET_ACCOUNT_DETAILS, accountApi.getAccountDetail);
export const getFavoriteMovies = createAction(GET_FAVORITE_MOVIES, accountApi.getFavoriteMovies);
export const getFavoriteTV = createAction(GET_FAVORITE_TV, accountApi.getFavoriteTV);
export const markAsFavorite = createAction(MARK_AS_FAVORITE, accountApi.markAsFavorite);
export const getRatedMovies = createAction(GET_RATED_MOVIES, accountApi.getRatedMovies);
export const getRatedTV = createAction(GET_RATED_TV, accountApi.getRatedTV);
export const getGenreList = createAction(GET_GENRE_LIST, accountApi.getGenreList);
export const deleteRatingMovies = createAction(DELETE_RATING_MOVIES, accountApi.deleteRatingMovies);
export const deleteRatingTV = createAction(DELETE_RATING_TV, accountApi.deleteRatingTV);

// initial state
const initialState = Map({
    accountDetail: null,
    favoriteMovies: null,
    favoriteTV: null,
    ratedMovies: null,
    ratedTV: null,
    genreList: null,
    loading: true
});

// reducer
export default handleActions({
    ...pender({
        type: GET_ACCOUNT_DETAILS,
        onSuccess: (state, action) => {
            const { data: accountDetail } = action.payload;
            localStorage.setItem('accountId', accountDetail.id);
            return state.set('accountDetail', accountDetail);
        }
    }),
    ...pender({
        type: GET_FAVORITE_MOVIES,
        onSuccess: (state, action) => {
            const { data: { results: favoriteMovies }} = action.payload;
            return state.set('favoriteMovies', favoriteMovies);
        }
    }),
    ...pender({
        type: GET_FAVORITE_TV,
        onSuccess: (state, action) => {
            const { data: { results: favoriteTV }} = action.payload;
            return state.set('favoriteTV', favoriteTV);
        }
    }),
    ...pender({
        type: MARK_AS_FAVORITE,
    }),
    ...pender({
        type: GET_RATED_MOVIES,
        onSuccess: (state, action) => {
            const { data: { results: ratedMovies }} = action.payload;
            return state.set('ratedMovies', ratedMovies);
        }
    }),
    ...pender({
        type: GET_RATED_TV,
        onSuccess: (state, action) => {
            const { data: { results: ratedTV }} = action.payload;
            return state.set('ratedTV', ratedTV);
        }
    }),
    ...pender({
        type: GET_GENRE_LIST,
        onSuccess: (state, action) => {
            const { data: { genres: genreList } } = action.payload;
            return state.set('genreList', genreList);
        }
    }),
    ...pender({
        type: DELETE_RATING_MOVIES,
        onSuccess: (state, action) => {
            return console.log('success');
        },
    }),
    ...pender({
        type: DELETE_RATING_TV,
        onSuccess: (state, action) => {
            return console.log('success');
        },
    }),
}, initialState)