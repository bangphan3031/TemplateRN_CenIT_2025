import { SET_USER, REMOVE_USER, SET_DEVICE_TOKEN } from '../actions/userAction';

const intitalState = {
  user: null,
  deviceToken: null,
};

const userReducer = (state = intitalState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case REMOVE_USER:
      return {
        ...state,
        user: null,
      };
    case SET_DEVICE_TOKEN:
      return {
        ...state,
        deviceToken: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
