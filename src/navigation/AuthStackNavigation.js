/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import colors from '../constants/colors';
import BottomTabs from './BottomNavigation';
import {useTranslation} from 'react-i18next';
import UserInfo from '../screens/userInfoScreen/UserInfoScreen';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import ConfirmScreen from '../screens/confirmScreen/ConfirmScreen';
import PolicyScreen from '../screens/policyScreen/PolicyScreen';
import TermsScreen from '../screens/termsScreen/TermsScreen';

const Stack = createNativeStackNavigator();
const screenOptions = {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTintColor: colors.white,
  headerTitleStyle: {
    fontFamily: 'helveticaneuelight',
    textTransform: 'uppercase',
    fontSize: 17,
  },
  headerTitleAlign: 'center',
  tabBarShowLabel: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: '#fff',
  },
  animation: 'slide_from_right',
  headerBackTitleVisible: false,
  headerBackButtonMenuEnabled: false,
};

const AuthStackNavigation = () => {
  const {t} = useTranslation();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="BottomTabStack"
        options={{
          headerShown: false,
        }}
        component={BottomTabs}
      />
      <Stack.Screen
        name="UserInfo"
        component={UserInfo}
        options={() => ({
          title: 'THÔNG TIN CÁ NHÂN',
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={() => ({
          title: 'CHỌN SỐ',
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="ConfirmScreen"
        component={ConfirmScreen}
        options={() => ({
          title: 'XÁC NHẬN ĐĂNG KÝ',
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="TermsScreen"
        component={TermsScreen}
        options={() => ({
          title: 'ĐIỀU KHOẢN SỬ DỤNG',
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="PolicyScreen"
        component={PolicyScreen}
        options={() => ({
          title: 'CHÍNH SÁCH & QUYỀN RIÊNG TƯ',
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;
