import React, {useState} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ActivityIndicator} from 'react-native-paper';

const LazyImage = ({url, width, height}) => {
  const [loading, setLoading] = useState(true);

  const handleLoadStart = () => {
    console.log('Image loading started');
    setLoading(true);
  };

  const handleLoad = () => {
    console.log('Image loading completed');
    setLoading(false);
  };

  return (
    <View>
      {loading && <ActivityIndicator />}
      <FastImage
        style={{width: width, height: height}}
        source={{
          uri: url,
          priority: FastImage.priority.normal,
        }}
        onLoadStart={handleLoadStart}
        onLoad={handleLoad}
      />
    </View>
  );
};

export default LazyImage;
