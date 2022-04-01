import {
  RECEIVE_ALBUNS_EMPTY, RECEIVE_ALBUNS_FAILURE,
  RECEIVE_ALBUNS_SUCESS,
  // eslint-disable-next-line comma-dangle
  REQUEST_ALBUNS_START
} from '../actions/requestAlbuns';

const INITIAL_STATE = {
  albuns: [],
  songs: [],
  favoriteSongs: [],
  isFetching: false,
  error: '',
  empty: false,
};

function responseReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_ALBUNS_START:
    return {
      ...state,
      isFetching: true,
      empty: false,
      albuns: action.albuns,
    };

  case RECEIVE_ALBUNS_SUCESS: return {
    ...state,
    albuns: action.albuns,
    isFetching: false,
  };

  case RECEIVE_ALBUNS_EMPTY: return {
    ...state,
    empty: action.empty,
  };

  case RECEIVE_ALBUNS_FAILURE: return {
    ...state,
    error: action.error,
    isFetching: false,
  };

  default: return state;
  }
}

export default responseReducer;
