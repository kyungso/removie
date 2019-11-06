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
const POST_RATING_MOVIES = 'account/POST_RATING_MOVIES';
const POST_RATING_TV = 'account/POST_RATING_TV';
const EDIT_RATED_MOVIES = 'account/EDIT_RATED_MOVIES';
const EDIT_RATED_TV = 'account/EDIT_RATED_TV';

// action creators
export const getAccountDetail = createAction(GET_ACCOUNT_DETAILS, accountApi.getAccountDetail);

export const getFavoriteMovies = createAction(GET_FAVORITE_MOVIES, accountApi.getFavoriteMovies);
export const getFavoriteTV = createAction(GET_FAVORITE_TV, accountApi.getFavoriteTV);
export const markAsFavorite = createAction(MARK_AS_FAVORITE, accountApi.markAsFavorite);

export const getRatedMovies = createAction(GET_RATED_MOVIES, accountApi.getRatedMovies);
export const getRatedTV = createAction(GET_RATED_TV, accountApi.getRatedTV);
export const getGenreList = createAction(GET_GENRE_LIST, accountApi.getGenreList);
export const deleteRatingMovies = createAction(DELETE_RATING_MOVIES, accountApi.deleteRatingMovies, payload => payload);
export const deleteRatingTV = createAction(DELETE_RATING_TV, accountApi.deleteRatingTV, payload => payload);
export const postRatingMovies = createAction(POST_RATING_MOVIES, accountApi.postRatingMovies);
export const postRatingTV = createAction(POST_RATING_TV, accountApi.postRatingTV);
export const editRatedMovies = createAction(EDIT_RATED_MOVIES);
export const editRatedTV = createAction(EDIT_RATED_TV);

// initial state
const initialState = Map({
    accountDetail: null,
    favoriteMovies: null,
    favoriteTV: null,
    ratedMovies: null,
    ratedTV: null,
    genreList: null,
    updateRating: null,
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
            const id = action.meta;
            return state && state.set('ratedMovies', state.get('ratedMovies').filter(movie => movie.id !== id));
        },
    }),
    ...pender({
        type: DELETE_RATING_TV,
        onSuccess: (state, action) => {
            const id = action.meta;
            return state && state.set('ratedTV', state.get('ratedTV').filter(tv => tv.id !== id));
        },
    }),
    ...pender({
        type: POST_RATING_MOVIES
    }),
    ...pender({
        type: POST_RATING_TV
    }),
    [EDIT_RATED_MOVIES]: (state, action) => {
        let ratedMovies = state.get('ratedMovies');
        const { id, rate } = action.payload;
        let index = ratedMovies.findIndex(movie => movie.id === id);
        if(index > -1) state.set(state.get('ratedMovies')[index].rating = rate);
        return state.set('updateRating', []);
    },
    [EDIT_RATED_TV]: (state, action) => {
        let ratedTV = state.get('ratedTV')
        const { id, rate } = action.payload;
        let index = ratedTV.findIndex(tv => tv.id === id);
        if(index > -1) state.set(state.get('ratedTV')[index].rating = rate);
        return state.set('updateRating', []);
    }
}, initialState)