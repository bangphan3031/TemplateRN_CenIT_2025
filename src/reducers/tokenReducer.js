import {SET_DEVICE_TOKEN} from '../actions/tokenAction';

const intitalState = {
  deviceToken: null,
};

const tokenReducer = (state = intitalState, action) => {
  switch (action.type) {
    case SET_DEVICE_TOKEN:
      return {
        ...state,
        deviceToken: action.payload,
      };

    default:
      return state;
  }
};

export default tokenReducer;
