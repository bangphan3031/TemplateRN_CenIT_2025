export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const SET_DEVICE_TOKEN = 'SET_DEVICE_TOKEN';

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

export const setDeviceToken = deviceToken => {
  return {
    type: SET_DEVICE_TOKEN,
    payload: deviceToken,
  };
};
