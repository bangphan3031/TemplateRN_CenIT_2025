export const SET_SUCCESS_DATA = 'SET_SUCCESS_DATA';
export const RELOAD_DATA = 'RELOAD_DATA';
export const SET_OPEN_MODAL = 'SET_OPEN_MODAL';

export const setSuccessData = data => {
  return {
    type: SET_SUCCESS_DATA,
    payload: data,
  };
};

export const reloadData = () => {
  return {
    type: RELOAD_DATA,
  };
};

export const setOpenModal = data => {
  return {
    type: SET_OPEN_MODAL,
    payload: data,
  };
};
