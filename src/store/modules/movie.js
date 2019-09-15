import { createAction, handleActions }from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

import { moviesApi } from 'lib/api';

// action types
const GET_MOVIE_NOWPLAYING = 'movie/GET_MOVIE_NOWPLAYING';
const GET_MOVIE_UPCOMING = 'movie/GET_MOVIE_UPCOMING';
const GET_MOVIE_POPULAR = 'movie/GET_MOVIE_POPULAR';

// action creators
export const getMovieNowplaying = createAction(GET_MOVIE_NOWPLAYING, moviesApi.nowPlaying);
export const getMovieUpcoming = createAction(GET_MOVIE_UPCOMING, moviesApi.upcoming);
export const getMoviePopular = createAction(GET_MOVIE_POPULAR, moviesApi.popular);

// initial state
const initialState = Map({
    nowPlaying: null,
    upcoming: null,
    popular: null,
    loading: true
});

// reducer
export default handleActions({
    ...pender({
        type: GET_MOVIE_NOWPLAYING,
        onSuccess: (state, action) => {
            const { data: { results: nowPlaying }} = action.payload; 
            return state.set('nowPlaying', nowPlaying)
        }
    }),
    ...pender({
        type: GET_MOVIE_UPCOMING,
        onSuccess: (state, action) => {
            const { data: { results: upcoming }} = action.payload; 
            return state.set('upcoming', upcoming)
        }
    }),
    ...pender({
        type: GET_MOVIE_POPULAR,
        onSuccess: (state, action) => {
            const { data: { results: popular }} = action.payload; 
            return state.set('popular', popular)
        }
    }),

}, initialState)