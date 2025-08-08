import React, {createContext, useContext, useRef} from 'react';
import LoadingModal from '../components/modals/LoadingModal';

const LoadingContext = createContext();

export const useLoading = () => {
  return useContext(LoadingContext);
};

const LoadingProvider = ({children}) => {
  const modalRef = useRef(null);

  const showLoading = () => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  };

  const hideLoading = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <LoadingContext.Provider value={{showLoading, hideLoading}}>
      {children}
      <LoadingModal ref={modalRef} />
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
