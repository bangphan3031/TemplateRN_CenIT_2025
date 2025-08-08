import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton, TextInput} from 'react-native-paper';
import colors from '../../constants/colors';
import DefaultText from '../texts/DefaultText';

const IconInput = ({
  label,
  errorMessage,
  style,
  value,
  onChange,
  onBlur,
  mode = 'outlined',
  leftIcon,
  isPasswordInput,
  inputMode,
  keyboardType,
} = props) => {
  const [showPassword, setShowPassword] = useState(isPasswordInput);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        label={label}
        style={style}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        error={errorMessage}
        mode={mode}
        inputMode={inputMode ? inputMode : 'none'}
        keyboardType={keyboardType ? keyboardType : 'default'}
        right={
          isPasswordInput ? (
            showPassword ? (
              <TextInput.Icon
                icon="eye"
                onPress={() => setShowPassword(!showPassword)}
              />
            ) : (
              <TextInput.Icon
                icon="eye-off"
                onPress={() => setShowPassword(!showPassword)}
              />
            )
          ) : (
            ''
          )
        }
        left={
          leftIcon ? (
            <TextInput.Icon
              icon={leftIcon}
              onPress={() => setShowPassword(!showPassword)}
            />
          ) : (
            ''
          )
        }
        secureTextEntry={showPassword}
      />
      {
        <DefaultText
          text={errorMessage}
          style={styles.errorMessage}></DefaultText>
      }
    </View>
  );
};

export default IconInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  errorMessage: {
    color: colors.danger,
  },
});
