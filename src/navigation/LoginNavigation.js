import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserScreen from '../screens/userScreen/UserScreen';
import InstructScreen from '../screens/instructScreen/InstructScreen';

const Stack = createNativeStackNavigator();

const LoginNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InstructScreen"
        options={{
          headerShown: false,
        }}
        component={InstructScreen}
      />
      <Stack.Screen
        name="UserScreen"
        options={{
          headerShown: false,
        }}
        component={UserScreen}
      />
    </Stack.Navigator>
  );
};

export default LoginNavigation;
