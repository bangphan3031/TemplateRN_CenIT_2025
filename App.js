import i18next from './src/localization/i18n';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaView, StyleSheet } from 'react-native';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
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
                    <BottomTabs />
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
