import {SET_SUCCESS_DATA} from '../actions/dataAction';
import {SET_OPEN_MODAL} from '../actions/dataAction';
import {RELOAD_DATA} from '../actions/dataAction';

const intitalState = {
  successData: null,
  reloadData: false,
  openModal: false,
};

const dataReducer = (state = intitalState, action) => {
  switch (action.type) {
    case SET_SUCCESS_DATA:
      return {
        ...state,
        successData: action.payload,
      };

    case RELOAD_DATA:
      return {
        ...state,
        reloadData: !state.reloadData,
      };

    case SET_OPEN_MODAL:
      return {
        ...state,
        openModal: action.payload,
      };

    default:
      return state;
  }
};

export default dataReducer;
