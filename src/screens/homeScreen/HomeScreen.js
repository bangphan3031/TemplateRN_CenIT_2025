import { View } from 'react-native';
import { useState } from 'react';
import WebViewRender from '../../components/webViewRender/WebViewRender';

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <WebViewRender
        url={
          'https://github.com/meliorence/react-native-render-html/issues/428'
        }
        style={{
          marginHorizontal: 10,
        }}
      />
    </View>
  );
};

export default HomeScreen;
