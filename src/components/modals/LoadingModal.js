import React, {forwardRef, useImperativeHandle} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import colors from '../../constants/colors';

const LoadingModal = forwardRef(({}, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Cung cấp các phương thức open và close thông qua ref
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  if (!isOpen) return null; // Không render modal nếu không mở

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
});

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute', // Bao phủ toàn màn hình
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Màu nền với độ mờ
    zIndex: 1000, // Đảm bảo nằm trên các thành phần khác
  },
});
export default LoadingModal;
