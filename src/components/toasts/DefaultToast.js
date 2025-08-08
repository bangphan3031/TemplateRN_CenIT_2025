import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';

const DefaultToast = ({type, text1, text2}) => {
  useEffect(() => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  }, []);
  return null;
};

export default DefaultToast;
