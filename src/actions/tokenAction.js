export const SET_DEVICE_TOKEN = 'SET_DEVICE_TOKEN';

export const setDeviceToken = deviceToken => {
  return {
    type: SET_DEVICE_TOKEN,
    payload: deviceToken,
  };
};
