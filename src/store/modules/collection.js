import { createAction, handleActions }from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'store/createRequestSaga';

import { collectionApi } from 'lib/api';

// action types
const [GET_COLLECTION_LIST, GET_COLLECTION_LIST_SUCCESS] = createRequestActionTypes(
    'collection/GET_COLLECTION_LIST'
);

// action creators
export const getCollectionList = createAction(GET_COLLECTION_LIST);

// create saga
const getCollectionListSaga = createRequestSaga(GET_COLLECTION_LIST, collectionApi.collectionDetail);
export function* collectionSaga() {
    yield takeLatest(GET_COLLECTION_LIST, getCollectionListSaga);
}

// initial state
const initialState = {
    result: null
};

// reducer
const collection = handleActions({
    [GET_COLLECTION_LIST_SUCCESS]: (state, { payload: result }) => ({
        ...state,
        result: result
    })
}, initialState);

export default collection;