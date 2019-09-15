import { createAction, handleActions }from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

import { moviesApi, tvApi } from 'lib/api';

// action types
const GET_MOVIE_TRENDING = 'home/GET_MOVIE_TRENDING';
const GET_TV_TRENDING = 'home/GET_TV_TRENDING';
const GET_TOPRATED = 'home/GET_TOPRATED';

// action creators
export const getMovieTrending = createAction(GET_MOVIE_TRENDING, moviesApi.trending);
export const getTvTrending = createAction(GET_TV_TRENDING, tvApi.trending);
export const getTopRated = createAction(GET_TOPRATED, moviesApi.topRated);

// initial state
const initialState = Map({
    movieTrending: null,
    tvTrending: null,
    topRated: null,
    loading: true
});

// reducer
export default handleActions({
    ...pender({
        type: GET_MOVIE_TRENDING,
        onSuccess: (state, action) => {
            const { data: { results: movieTrending }} = action.payload; 
            return state.set('movieTrending', movieTrending)
        }
    }),
    ...pender({
        type: GET_TV_TRENDING,
        onSuccess: (state, action) => {
            const { data: { results: tvTrending }} = action.payload; 
            return state.set('tvTrending', tvTrending)
        }
    }),
    ...pender({
        type: GET_TOPRATED,
        onSuccess: (state, action) => {
            const { data: { results: topRated }} = action.payload; 
            return state.set('topRated', topRated)
        }
    }),

}, initialState)