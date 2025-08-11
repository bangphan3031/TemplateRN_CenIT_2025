import {StyleSheet} from 'react-native';
import {Button, Icon, Text} from 'react-native-paper';
import colors from '../../constants/colors';

const DefaultButton = ({
  title,
  onPress,
  type = 'primary',
  style,
  mode = 'contained',
  leftIcon,
  rightIcon,
  width,
  height,
  titleStyle,
} = props) => {
  return (
    <Button
      onPress={onPress}
      labelStyle={{fontSize: 14}}
      buttonColor={mode === 'outlined' ? colors.white : colors[type]}
      mode={mode}
      icon={leftIcon ? leftIcon : rightIcon ? rightIcon : ''}
      contentStyle={[
        {flexDirection: rightIcon ? 'row-reverse' : 'row', width, height},
      ]}
      style={[
        styles.button,
        {
          borderWidth: mode === 'outlined' ? 1 : 0,
          borderColor: colors[type],
        },
        style,
      ]}>
      <Text
        style={[
          styles.title,
          {color: mode === 'outlined' ? colors[type] : colors.white},
          titleStyle,
        ]}>
        {title}
      </Text>
    </Button>
  );
};

export default DefaultButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowButton: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
  },
});
