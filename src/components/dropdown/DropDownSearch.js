import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {Icon} from 'react-native-paper';
import colors from '../../constants/colors';

const DropdownSearch = ({
  data = [],
  labelField = 'label',
  valueField = 'value',
  placeholder = 'Chọn giá trị',
  searchPlaceholder = 'Tìm kiếm...',
  value,
  onChange,
  style = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        value={value}
        onChange={onChange}
        itemTextStyle={{color: colors.black}}
        renderRightIcon={() => (
          <Icon source="menu-down" size={30} color={colors.black} />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
  },
  dropdown: {
    height: 50,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.black, 
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: colors.black, 
    borderBottomWidth: 1,
    borderColor: colors.secondary,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default DropdownSearch;