export const SET_AGENCY = 'SET_AGENCY';
export const SET_WARD_ID = 'SET_WARD_ID';

export const setAgency = agency => {
  return {
    type: SET_AGENCY,
    payload: agency,
  };
};

export const setWardId = wardId => {
  return {
    type: SET_WARD_ID,
    payload: wardId,
  };
};
