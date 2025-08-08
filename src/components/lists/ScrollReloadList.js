import React, {useState} from 'react';
import {RefreshControl} from 'react-native';
import {ScrollView} from 'react-native';

const ScrollReloadList = ({
  children,
  onReload,
  contentContainerStyle,
} = props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setIsRefreshing(true);
      await onReload();
      setIsRefreshing(false);
    } catch (error) {
      setIsRefreshing(false);
    }
    setIsRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={contentContainerStyle}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }>
      {children}
    </ScrollView>
  );
};

export default ScrollReloadList;
