import { createAction, handleActions }from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

import { moviesApi, tvApi } from 'lib/api';

// action types
const GET_MOVIE_DETAIL = 'detail/GET_MOVIE_DETAIL';
const GET_MOVIE_IMDB_ID = 'detail/GET_MOVIE_IMDB_ID';
const GET_MOVIE_VIDEOS = 'detail/GET_MOVIE_VIDEOS';
const GET_TV_DETAIL = 'detail/GET_TV_DETAIL';
const GET_TV_IMDB_ID = 'detail/GET_TV_IMDB_ID';
const GET_TV_VIDEOS = 'detail/GET_TV_VIDEOS';

// action creators
export const getMovieDetail = createAction(GET_MOVIE_DETAIL, moviesApi.movieDetail);
export const getMovieImdbId = createAction(GET_MOVIE_IMDB_ID, moviesApi.movieFindImdbId);
export const getMovieVideos = createAction(GET_MOVIE_VIDEOS, moviesApi.movieVideos);
export const getTvDetail = createAction(GET_TV_DETAIL, tvApi.showDetail);
export const getTvImdbId = createAction(GET_TV_IMDB_ID, tvApi.showFindImdbId);
export const getTvVideos = createAction(GET_TV_VIDEOS, tvApi.showVideos);

// initial state
const initialState = Map({
    result: null,
    imdb_id: null,
    videos: null,
    loading: true
});

// reducer
export default handleActions({
    ...pender({
        type: GET_MOVIE_DETAIL,
        onSuccess: (state, action) => {
            const { data: result } = action.payload; 
            return state.set('result', result)
        }
    }),
    ...pender({
        type: GET_MOVIE_IMDB_ID,
        onSuccess: (state, action) => {
            const { data: imdb_id } = action.payload; 
            return state.set('imdb_id', imdb_id)
        }
    }),
    ...pender({
        type: GET_MOVIE_VIDEOS,
        onSuccess: (state, action) => {
            const { data: videos } = action.payload; 
            return state.set('videos', videos)
        }
    }),
    ...pender({
        type: GET_TV_DETAIL,
        onSuccess: (state, action) => {
            const { data: result } = action.payload; 
            return state.set('result', result)
        }
    }),
    ...pender({
        type: GET_TV_IMDB_ID,
        onSuccess: (state, action) => {
            const { data: imdb_id } = action.payload; 
            return state.set('imdb_id', imdb_id)
        }
    }),
    ...pender({
        type: GET_TV_VIDEOS,
        onSuccess: (state, action) => {
            const { data: videos } = action.payload; 
            return state.set('videos', videos)
        }
    }),

}, initialState)