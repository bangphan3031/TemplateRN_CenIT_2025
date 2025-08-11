import i18next from './src/localization/i18n';
import React from 'react';
import {I18nextProvider, useTranslation} from 'react-i18next';
import {StyleSheet, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {PaperProvider, DefaultTheme} from 'react-native-paper';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import RootNavigator from './src/navigation/RootNavigation';
import LoadingProvider from './src/providers/LoadingProvider';
import ToastProvider from './src/providers/ToastProvider';
import BottomTabs from './src/navigation/BottomNavigation';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    background: '#ffffff', // Đặt màu nền cố định
    surface: '#ffffff', // Đặt màu bề mặt cố định
    text: '#000000', // Đặt màu chữ
  },
};
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <I18nextProvider i18n={i18next}>
            <SafeAreaView style={styles.container}>
              <ToastProvider>
                <LoadingProvider>
                  <NavigationContainer>
                    <RootNavigator />
                  </NavigationContainer>
                  <Toast />
                </LoadingProvider>
              </ToastProvider>
            </SafeAreaView>
          </I18nextProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'helveticaneue',
    fontStyle: 'italic',
  },
});
