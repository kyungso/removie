import { createAction, handleActions }from 'redux-actions';

import { Map } from 'immutable';

// action types
const INITIALIZE = 'search/INITIALIZE';
const CHANGE_INPUT = 'search/CHANGE_INPUT';
const SET_SEARCH_RESULTS = 'search/SET_SEARCH_RESULTS';

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const setSearchResults = createAction(SET_SEARCH_RESULTS);

// initial state
const initialState = Map({
    movieResults: null,
    tvResults: null,
    collectionResults: null,
    searchTerm: '',
    loading: true
});

// reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
        const { value } = action.payload;
        return state.set('searchTerm', value);
    },
    [SET_SEARCH_RESULTS]: (state, action) => {
        const { movieResults, tvResults, collectionResults } = action.payload;
        return state.set('movieResults', movieResults)
                    .set('tvResults', tvResults)
                    .set('collectionResults', collectionResults)
    },
}, initialState)