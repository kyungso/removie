import { createAction, handleActions }from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

import { moviesApi, tvApi, collectionApi } from 'lib/api';

// action types
const INITIALIZE = 'search/INITIALIZE';
const CHANGE_INPUT = 'search/CHANGE_INPUT';

const GET_SEARCH_MOVIES = 'search/GET_SEARCH_MOVIES';
const GET_SEARCH_TV = 'search/GET_SEARCH_TV';
const GET_SEARCH_COLLECTION = 'search/GET_SEARCH_COLLECTION';
// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);

export const getSearchMovies = createAction(GET_SEARCH_MOVIES, moviesApi.search);
export const getSearchTV = createAction(GET_SEARCH_TV, tvApi.search);
export const getSearchCollection = createAction(GET_SEARCH_COLLECTION, collectionApi.search);

// initial state
const initialState = Map({
    movieResults: null,
    movieTotalPages: 1,
    movieTotalResults: 1,
    tvResults: null,
    tvTotalPages: 1,
    tvTotalResults: 1,
    collectionResults: null,
    collectionTotalPages: 1,
    collectionTotalResults: 1,
    activePage: 1,
    searchTerm: '',
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
            const { data: { page: activePage, results: movieResults, total_pages: movieTotalPages, total_results: movieTotalResults }} = action.payload;
            return state.set('movieResults', movieResults)
                        .set('movieTotalPages', movieTotalPages)
                        .set('movieTotalResults', movieTotalResults)
                        .set('activePage', activePage);
        }
    }),  
    ...pender({
        type: GET_SEARCH_TV,
        onSuccess: (state, action) => {
            const { data: { page: activePage, results: tvResults, total_pages: tvTotalPages, total_results: tvTotalResults }} = action.payload;
            return state.set('tvResults', tvResults)
                        .set('tvTotalPages', tvTotalPages)
                        .set('tvTotalResults', tvTotalResults)
                        .set('activePage', activePage);
        }
    }),   
    ...pender({
        type: GET_SEARCH_COLLECTION,
        onSuccess: (state, action) => {
            const { data: { page: activePage, results: collectionResults, total_pages: collectionTotalPages, total_results: collectionTotalResults }} = action.payload;
            return state.set('collectionResults', collectionResults)
                        .set('collectionTotalPages', collectionTotalPages)
                        .set('collectionTotalResults', collectionTotalResults)
                        .set('activePage', activePage);
        }
    }),  
}, initialState)