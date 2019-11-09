import { createAction, handleActions }from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

import { moviesApi, tvApi, collectionApi } from 'lib/api';

// action types
const INITIALIZE = 'search/INITIALIZE';
const CHANGE_INPUT = 'search/CHANGE_INPUT';

const GET_SEARCH_MOVIES = 'search/GET_SEARCH_MOVIES';
const GET_SEARCH_PAGE_MOVIES = 'search/GET_SEARCH_PAGE_MOVIES';
const GET_SEARCH_TV = 'search/GET_SEARCH_TV';
const GET_SEARCH_PAGE_TV = 'search/GET_SEARCH_PAGE_TV';
const GET_SEARCH_COLLECTION = 'search/GET_SEARCH_COLLECTION';
const GET_SEARCH_PAGE_COLLECTION = 'search/GET_SEARCH_PAGE_COLLECTION';

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);

export const getSearchMovies = createAction(GET_SEARCH_MOVIES, moviesApi.search);
export const getSearchPageMovies = createAction(GET_SEARCH_PAGE_MOVIES, moviesApi.search);
export const getSearchTV = createAction(GET_SEARCH_TV, tvApi.search);
export const getSearchPageTV = createAction(GET_SEARCH_PAGE_TV, tvApi.search);
export const getSearchCollection = createAction(GET_SEARCH_COLLECTION, collectionApi.search);
export const getSearchPageCollection = createAction(GET_SEARCH_PAGE_COLLECTION, collectionApi.search);

// initial state
const initialState = Map({
    movieResults: null,
    tvResults: null,
    collectionResults: null,
    searchTerm: '',
    total_pages: 1,
    loading: true
});

// reducer
export default handleActions({
    [INITIALIZE]: (state, action) => {
        return state.set('searchTerm', '');
    },
    [CHANGE_INPUT]: (state, action) => {
        const { value } = action.payload;
        return state.set('searchTerm', value);
    },
    ...pender({
        type: GET_SEARCH_MOVIES,
        onSuccess: (state, action) => {
            const { data: { results: movieResults, total_pages: mtotal_pages }} = action.payload;
            return state.set('movieResults', movieResults)
                        .set('total_pages', mtotal_pages);
        }
    }),  
    ...pender({
        type: GET_SEARCH_PAGE_MOVIES,
        onSuccess: (state, action) => {
            const { data: { results: mResults }} = action.payload;
            return state.set('movieResults', state.get('movieResults').concat(mResults));
        }
    }), 
    ...pender({
        type: GET_SEARCH_TV,
        onSuccess: (state, action) => {
            const { data: { results: tvResults, total_pages: ttotal_pages }} = action.payload;
            return state.set('tvResults', tvResults)
                        .set('total_pages', ttotal_pages);
        }
    }),  
    ...pender({
        type: GET_SEARCH_PAGE_TV,
        onSuccess: (state, action) => {
            const { data: { results: tResults }} = action.payload;
            return state.set('tvResults', state.get('tvResults').concat(tResults));
        }
    }), 
    ...pender({
        type: GET_SEARCH_COLLECTION,
        onSuccess: (state, action) => {
            const { data: { results: collectionResults, total_pages: ctotal_pages }} = action.payload;
            return state.set('collectionResults', collectionResults)
                        .set('total_pages', ctotal_pages);
        }
    }),  
    ...pender({
        type: GET_SEARCH_PAGE_COLLECTION,
        onSuccess: (state, action) => {
            const { data: { results: cResults }} = action.payload;
            return state.set('collectionResults', state.get('collectionResults').concat(cResults));
        }
    }),  
}, initialState)