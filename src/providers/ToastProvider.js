import React, {createContext, useContext, useEffect, useState} from 'react';
import DefaultToast from '../components/toasts/DefaultToast';

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

const ToastProvider = ({children}) => {
  const [isShowToast, setIsShowToast] = useState(false);
  const [option, setOption] = useState({
    type: 'info',
    text1: '',
    text2: '',
  });

  useEffect(() => {
    let showToastID = null;
    if (isShowToast) {
      showToastID = setTimeout(() => {
        setIsShowToast(false);
      }, 3000);
    }

    return () => {
      showToastID && clearTimeout(showToastID);
    };
  }, [isShowToast]);

  const showToast = newOption => {
    setOption(newOption);
    setIsShowToast(true);
  };

  const hideToast = () => {
    setIsShowToast(false);
  };

  return (
    <ToastContext.Provider value={{showToast, hideToast}}>
      {children}
      {isShowToast ? (
        <DefaultToast
          type={option.type}
          text1={option.text1}
          text2={option.text2}
        />
      ) : (
        ''
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
