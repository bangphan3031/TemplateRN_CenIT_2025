import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-paper';
import colors from '../../constants/colors';

const HeaderBar = ({title, hideBack = false}) => {
  const navigation = useNavigation();
  const isFirstScreen = navigation.canGoBack() ? true : false;

  return (
    <View style={styles.modalTitleCont}>
      {isFirstScreen && !hideBack && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon source="arrow-left" size={30} color={colors.white} />
        </TouchableOpacity>
      )}
      <Text style={styles.modalTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modalTitleCont: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 16,
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  modalTitle: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default HeaderBar;
