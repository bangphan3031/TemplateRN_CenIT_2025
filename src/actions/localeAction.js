export const SET_LOCALE = 'SET_LOCALE';
export const REMOVE_LOCALE = 'REMOVE_LOCALE';

export const setLocale = locale => {
  return {
    type: SET_LOCALE,
    payload: locale,
  };
};

export const removeLocale = () => {
  return {
    type: REMOVE_LOCALE,
  };
};
