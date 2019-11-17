import { createAction, handleActions }from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'store/createRequestSaga';

import { moviesApi, tvApi, collectionApi } from 'lib/api';

// action types
const INITIALIZE = 'search/INITIALIZE';
const CHANGE_INPUT = 'search/CHANGE_INPUT';

const [GET_SEARCH_MOVIES, GET_SEARCH_MOVIES_SUCCESS] = createRequestActionTypes(
    'search/GET_SEARCH_MOVIES'
);
const [GET_SEARCH_TV, GET_SEARCH_TV_SUCCESS] = createRequestActionTypes(
    'search/GET_SEARCH_TV'
);
const [GET_SEARCH_COLLECTION, GET_SEARCH_COLLECTION_SUCCESS] = createRequestActionTypes(
    'search/GET_SEARCH_COLLECTION'
);

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT, ({ value }) => ({ value }));

export const getSearchMovies = createAction(GET_SEARCH_MOVIES);
export const getSearchTV = createAction(GET_SEARCH_TV);
export const getSearchCollection = createAction(GET_SEARCH_COLLECTION);

// create saga
const getSearchMoviesSaga = createRequestSaga(GET_SEARCH_MOVIES, moviesApi.search);
const getSearchTVSaga = createRequestSaga(GET_SEARCH_TV, tvApi.search);
const getSearchCollectionSaga = createRequestSaga(GET_SEARCH_COLLECTION, collectionApi.search);
export function* searchSaga() {
    yield takeLatest(GET_SEARCH_MOVIES, getSearchMoviesSaga);
    yield takeLatest(GET_SEARCH_TV, getSearchTVSaga);
    yield takeLatest(GET_SEARCH_COLLECTION, getSearchCollectionSaga);
}

// initial state
const initialState = {
    movieResults: null,
    movieTotalPages: 0,
    movieTotalResults: 0,
    tvResults: null,
    tvTotalPages: 0,
    tvTotalResults: 0,
    collectionResults: null,
    collectionTotalPages: 0,
    collectionTotalResults: 0,
    activePage: 1,
    searchTerm: ''
};

// reducer
const search = handleActions({
    [INITIALIZE]: state => initialState,
    [CHANGE_INPUT]: (state, { payload: { value }}) => ({
        ...state,
        searchTerm: value
    }),
    [GET_SEARCH_MOVIES_SUCCESS]: (state, { payload }) => {
        const { page: activePage, results: movieResults, total_pages: movieTotalPages, total_results: movieTotalResults } = payload;
        return {...state,
                movieResults: movieResults,
                movieTotalPages: movieTotalPages,
                movieTotalResults: movieTotalResults,
                activePage: activePage
        };
    },
    [GET_SEARCH_TV_SUCCESS]: (state, { payload }) => {
        const { page: activePage, results: tvResults, total_pages: tvTotalPages, total_results: tvTotalResults } = payload;
        return {...state,
            tvResults: tvResults,
            tvTotalPages: tvTotalPages,
            tvTotalResults: tvTotalResults,
            activePage: activePage
        };
    },   
    [GET_SEARCH_COLLECTION_SUCCESS]: (state, { payload }) => {
        const { page: activePage, results: collectionResults, total_pages: collectionTotalPages, total_results: collectionTotalResults } = payload;
        return {...state,
            collectionResults: collectionResults,
            collectionTotalPages: collectionTotalPages,
            collectionTotalResults: collectionTotalResults,
            activePage: activePage
        };
    }
}, initialState);

export default search;