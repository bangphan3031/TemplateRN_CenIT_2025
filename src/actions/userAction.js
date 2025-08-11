export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const UPDATE_PHONE = 'UPDATE_PHONE';

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const updatePhone = phone => {
  return {
    type: UPDATE_PHONE,
    payload: phone,
  };
};
