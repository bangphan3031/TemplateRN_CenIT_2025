import {SET_LOCALE, REMOVE_LOCALE} from '../actions/localeAction';

const intitalState = {
  locale: null,
};

const localeReducer = (state = intitalState, action) => {
  switch (action.type) {
    case SET_LOCALE:
      return {
        ...state,
        locale: action.payload,
      };
    case REMOVE_LOCALE:
      return {
        ...state,
        locale: null,
      };

    default:
      return state;
  }
};

export default localeReducer;
