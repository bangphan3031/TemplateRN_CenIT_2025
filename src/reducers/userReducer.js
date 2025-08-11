import {SET_USER, REMOVE_USER, UPDATE_PHONE} from '../actions/userAction';

const intitalState = {
  user: null,
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
    case UPDATE_PHONE:
      return {
        ...state,
        user: {
          ...state.user,
          phone: action.payload,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
