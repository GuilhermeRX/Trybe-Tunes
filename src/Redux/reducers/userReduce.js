import { USER_INFO } from '../actions/userAction';

const INITIAL_STATE = {
  userName: '',
};

function userReduce(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_INFO:
    return {
      ...state,
      userName: action.userName,
    };
  default: return state;
  }
}

export default userReduce;
