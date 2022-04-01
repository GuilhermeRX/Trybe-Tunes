import {
  RECEIVE_FAVORITE_FAILURE,
  RECEIVE_FAVORITE_SUCESS,
  // eslint-disable-next-line comma-dangle
  REQUEST_FAVORITE_START
} from '../actions/requestFavoriteSongs';

const INITIAL_STATE = {
  songs: [],
  isFetching: false,
  error: '',
  canRenderFav: false,
};

function favoriteReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_FAVORITE_START: return {
    ...state,
    isFetching: true,
  };
  case RECEIVE_FAVORITE_SUCESS: return {
    ...state,
    isFetching: action.isFetching,
    songs: action.songs,
    canRenderFav: action.canRenderFav,
  };
  case RECEIVE_FAVORITE_FAILURE: return {
    ...state,
    isFetching: action.isFetching,
    error: action.error,
  };
  default: return state;
  }
}
export default favoriteReducer;
