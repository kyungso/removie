import { createAction, handleActions }from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

import { accountApi } from 'lib/api';

// action types
const GET_ACCOUNT_DETAILS = 'account/GET_ACCOUNT_DETAILS';
const GET_FAVORITE_MOVIES = 'account/GET_FAVORITE_MOVIES';
const MARK_AS_FAVORITE = 'account/MARK_AS_FAVORITE';

// action creators
export const getAccountDetail = createAction(GET_ACCOUNT_DETAILS, accountApi.getAccountDetail);
export const getFavoriteMovies = createAction(GET_FAVORITE_MOVIES, accountApi.getFavoriteMovies);
export const markAsFavorite = createAction(MARK_AS_FAVORITE, accountApi.markAsFavorite);

// initial state
const initialState = Map({
    accountDetail: null,
    favoriteMovies: null,
    loading: true
});

// reducer
export default handleActions({
    ...pender({
        type: GET_ACCOUNT_DETAILS,
        onSuccess: (state, action) => {
            const { data: accountDetail } = action.payload;
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
        type: MARK_AS_FAVORITE,
        onSuccess: (state, action) => {
            const { data: result } = action.payload;
            return console.log(result);
        }
    })
    
}, initialState)