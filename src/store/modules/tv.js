import { createAction, handleActions }from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

import { tvApi } from 'lib/api';

// action types
const GET_TV_TOPRATED = 'tv/GET_TV_TOPRATED';
const GET_TV_POPULAR = 'tv/GET_TV_POPULAR';
const GET_TV_AIRINGTODAY = 'tv/GET_TV_AIRINGTODAY';

// action creators
export const getTvToprated = createAction(GET_TV_TOPRATED, tvApi.topRated);
export const getTvPopular = createAction(GET_TV_POPULAR, tvApi.popular);
export const getTvAiringtoday = createAction(GET_TV_AIRINGTODAY, tvApi.airingToday);

// initial state
const initialState = Map({
    topRated: null,
    popular: null,
    airingToday: null,
    loading: true
});

// reducer
export default handleActions({
    ...pender({
        type: GET_TV_TOPRATED,
        onSuccess: (state, action) => {
            const { data: { results: topRated }} = action.payload; 
            return state.set('topRated', topRated)
        }
    }),
    ...pender({
        type: GET_TV_POPULAR,
        onSuccess: (state, action) => {
            const { data: { results: popular }} = action.payload; 
            return state.set('popular', popular)
        }
    }),
    ...pender({
        type: GET_TV_AIRINGTODAY,
        onSuccess: (state, action) => {
            const { data: { results: airingToday }} = action.payload; 
            return state.set('airingToday', airingToday)
        }
    }),

}, initialState)