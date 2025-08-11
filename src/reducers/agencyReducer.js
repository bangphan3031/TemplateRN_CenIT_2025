import {SET_AGENCY, SET_WARD_ID} from '../actions/agencyAction';

const intitalState = {
  agency: null,
  wardId: null,
};

const agencyReducer = (state = intitalState, action) => {
  switch (action.type) {
    case SET_AGENCY:
      return {
        ...state,
        agency: action.payload,
      };
    case SET_WARD_ID:
      return {
        ...state,
        wardId: action.payload,
      };

    default:
      return state;
  }
};

export default agencyReducer;
