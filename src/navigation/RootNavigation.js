import {useDispatch, useSelector} from 'react-redux';
import AuthStackNavigation from './AuthStackNavigation';
import LoginNavigation from './LoginNavigation';

const RootNavigator = () => {
  const user = useSelector(state => state.userReducer.user);

  return user ? <AuthStackNavigation /> : <LoginNavigation />;
};

export default RootNavigator;
