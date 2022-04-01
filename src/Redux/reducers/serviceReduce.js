import { SERVICE } from '../actions/serviceAction';

const INITIAL_STATE = {
  artist: '',
  isplay: false,
  indexMusic: 0,
};

function serviceReduce(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SERVICE:
    return {
      ...state,
      artist: action.artist,
      isplay: action.isplay,
      indexMusic: action.indexMusic,
    };
  default: return state;
  }
}

export default serviceReduce;
