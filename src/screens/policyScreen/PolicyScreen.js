import React from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import styles from './PolicyScreen.style';
import HeaderBar from '../../components/header/HeaderBar';

const PolicyScreen = () => {
  const url =
    'http://nhatrangtructuyen.vnptkhanhhoa.vn/Home/ChinhSachQuyenRiengTuBocSoTuXa';

  const handleStateChange = event => {
    console.log('Navigation State Changed:', event);
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="CHÍNH SÁCH & QUYỀN RIÊNG TƯ" />
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

export default PolicyScreen;
