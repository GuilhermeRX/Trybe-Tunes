import { combineReducers } from 'redux';
import favoriteReducer from './favoriteReducer';
import responseReducer from './responseReduce';
import serviceReduce from './serviceReduce';
import songsReducer from './songsReducer';
import userReduce from './userReduce';

const rootReducer = combineReducers({
  responseReducer, songsReducer, userReduce, serviceReduce, favoriteReducer,
});

export default rootReducer;
