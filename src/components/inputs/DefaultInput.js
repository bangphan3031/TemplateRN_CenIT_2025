import {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import colors from '../../constants/colors';
import DefaultText from '../texts/DefaultText';
import {IconButton} from 'react-native-paper';

const DefaultInput = ({
  errorMessage,
  style,
  value,
  onChange,
  onBlur,
  placeholder,
  isPasswordInput,
  inputMode = 'text',
  keyboardType = 'default',
  icon,
  onPressIcon,
  onPress,
  disabled = false,
  label,
  labelColor = colors.black,
  multiline,
  numberOfLines,
  maxLength,
  height = 44,
  width = '100%',
  editable = true,
  pointerEvents = 'auto',
} = props) => {
  const [showPassword, setShowPassword] = useState(isPasswordInput);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        pointerEvents={disabled ? 'none' : 'auto'}
        style={[
          styles.inputContainer,
          {height: height + (errorMessage ? 21 : 0) + (label ? 32 : 0), width},
        ]}>
        {label ? (
          <DefaultText
            text={label}
            style={[styles.label, {color: labelColor}]}></DefaultText>
        ) : (
          ''
        )}
        <TextInput
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          selectTextOnFocus={!disabled}
          style={[styles.input, style]}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          onBlur={onBlur}
          inputMode={inputMode ? inputMode : 'none'}
          keyboardType={keyboardType ? keyboardType : 'default'}
          secureTextEntry={showPassword}
          placeholderTextColor={colors.placeholderColor}
          autoCapitalize="none"
          pointerEvents={pointerEvents}
        />
        {isPasswordInput ? (
          showPassword ? (
            <IconButton
              icon="eye"
              onPress={() => setShowPassword(!showPassword)}
              style={[styles.hidePassword, {top: label ? 26 : -4}]}
              size={24}
            />
          ) : (
            <IconButton
              icon="eye-off"
              onPress={() => setShowPassword(!showPassword)}
              style={[styles.hidePassword, {top: label ? 26 : -4}]}
            />
          )
        ) : (
          ''
        )}
        {icon ? (
          <IconButton
            icon={icon}
            onPress={onPressIcon}
            style={[styles.hidePassword, {top: label ? 26 : -4}]}
          />
        ) : (
          ''
        )}
        {errorMessage ? (
          <DefaultText
            text={errorMessage}
            style={styles.errorMessage}></DefaultText>
        ) : (
          ''
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DefaultInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    gap: 1,
    width: 335,
  },
  input: {
    position: 'relative',
    fontFamily: 'helveticaneue',
    borderWidth: 0,
    borderRadius: 40,
    overflow: 'hidden',
    paddingHorizontal: 20,
    height: 44,
    fontSize: 16,
    color: colors.black,
  },
  hidePassword: {
    position: 'absolute',
    right: 0,
    top: -4,
  },
  errorMessage: {
    color: colors.danger,
  },
  label: {
    marginBottom: 5,
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
  },
});
