import {
  RECEIVE_SONGS_FAILURE,
  RECEIVE_SONGS_SUCESS,
  // eslint-disable-next-line comma-dangle
  REQUEST_SONGS_START
} from '../actions/requestSongs';

const INITIAL_STATE = {
  songs: [],
  isFetching: false,
  error: '',
  canRender: false,
};

function songsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_SONGS_START: return {
    ...state,
    isFetching: true,
  };
  case RECEIVE_SONGS_SUCESS: return {
    ...state,
    isFetching: action.isFetching,
    songs: action.songs,
    canRender: action.canRender,
  };
  case RECEIVE_SONGS_FAILURE: return {
    ...state,
    isFetching: action.isFetching,
    error: action.error,
    canRender: action.canRender,
  };
  default: return state;
  }
}

export default songsReducer;
