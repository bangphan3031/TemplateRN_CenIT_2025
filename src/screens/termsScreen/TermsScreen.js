import React from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import styles from './TermsScreen.style';
import HeaderBar from '../../components/header/HeaderBar';

const TermsScreen = () => {
  const url =
    'http://nhatrangtructuyen.vnptkhanhhoa.vn/Home/DieuKhoanSuDungBocSoTuXa';

  const handleStateChange = event => {
    console.log('Navigation State Changed:', event);
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="ĐIỀU KHOẢN SỬ DỤNG" />
      <WebView
        style={styles.webView}
        source={{
          uri: url,
        }}
        onNavigationStateChange={handleStateChange}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

export default TermsScreen;
