import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import home, { homeSaga } from './home';
// import login from './login';
// import account from './account';
import movie, { movieSaga } from './movie';
// import tv from './tv';
// import collection from './collection';
// import detail from './detail';
// import search from './search';
import loading from './loading';

const rootReducer = combineReducers({
    home,
    // login,
    // account,
    movie,
    // tv,
    // collection,
    // detail,
    // search,
    loading
});

export function* rootSaga() {
  yield all([homeSaga(), movieSaga()]);
}

export default rootReducer;