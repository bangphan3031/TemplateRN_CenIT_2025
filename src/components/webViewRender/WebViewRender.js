import {useState} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import WebViewModal from '../modals/WebViewModal';

const WebViewRender = ({url, style} = props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sourceUrl, setSourceUrl] = useState('');
  const [isClick, setIsClick] = useState(true);

  const handleStateChange = event => {
    if (event.url !== url && isClick) {
      setIsOpen(true);
      setSourceUrl(event.url);
      setIsClick(true);
    }
  };

  const onCloseModal = isOpen => {
    if (!isOpen) {
      setIsOpen(false);
      setIsClick(true);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        style={style}
        source={{
          uri: url,
        }}
        onNavigationStateChange={e => handleStateChange(e)}
      />
      <WebViewModal isOpen={isOpen} setIsOpen={onCloseModal} url={sourceUrl} />
    </View>
  );
};

export default WebViewRender;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
