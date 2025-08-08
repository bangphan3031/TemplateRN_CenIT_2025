import {RELOAD_DATA} from '../actions/sharedAction';

const intitalState = {
  reload: false,
};

const sharedReducer = (state = intitalState, action) => {
  switch (action.type) {
    case RELOAD_DATA:
      return {
        ...state,
        reload: !state.reload,
      };

    default:
      return state;
  }
};

export default sharedReducer;
