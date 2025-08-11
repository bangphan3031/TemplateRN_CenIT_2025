import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AgencyScreen from '../screens/agencyScreen/AgencyScreen';
import SettingScreen from '../screens/settingScreen/SettingScreen';
import {View, Platform} from 'react-native';
import {Icon} from 'react-native-paper';
import colors from '../constants/colors';
import DefaultText from '../components/texts/DefaultText';
import HistoryScreen from '../screens/infoScreen/HistoryScreen';

const Tab = createBottomTabNavigator();
const screenOptions = {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTintColor: colors.white,
  headerTitleStyle: {
    fontFamily: 'helveticaneuelight',
    textTransform: 'uppercase',
  },
  headerTitleAlign: 'center',
  tabBarShowLabel: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: Platform.OS === 'ios' ? 90 : 60,
    background: '#fff',
  },
};

const BottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Agency">
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: 'Lịch sử đặt số',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Icon
                  source="clock"
                  size={24}
                  color={focused ? colors.primary : colors.secondary}
                />
                <DefaultText
                  text="Lịch sử đặt số"
                  style={{
                    fontSize: 12,
                    color: focused ? colors.primary : colors.secondary,
                  }}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Agency"
        component={AgencyScreen}
        options={{
          title: 'Chọn lĩnh vực',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Icon
                  source="ticket-confirmation"
                  size={24}
                  color={focused ? colors.primary : colors.secondary}
                />
                <DefaultText
                  text={'Đặt số'}
                  style={{
                    fontSize: 12,
                    color: focused ? colors.primary : colors.secondary,
                  }}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          title: 'Khác',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Icon
                  source="dots-horizontal"
                  size={24}
                  color={focused ? colors.primary : colors.secondary}
                />
                <DefaultText
                  text={'Khác'}
                  style={{
                    fontSize: 12,
                    color: focused ? colors.primary : colors.secondary,
                  }}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
