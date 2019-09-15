import { createAction, handleActions }from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

import { collectionApi } from 'lib/api';

// action types
const GET_COLLECTION_LIST = 'collection/GET_COLLECTION_LIST';

// action creators
export const getCollectionList = createAction(GET_COLLECTION_LIST, collectionApi.collectionDetail);

// initial state
const initialState = Map({
    result: null,
    loading: true
});

// reducer
export default handleActions({
    ...pender({
        type: GET_COLLECTION_LIST,
        onSuccess: (state, action) => {
            const { data: result } = action.payload; 
            return state.set('result', result)
        }
    }),

}, initialState)