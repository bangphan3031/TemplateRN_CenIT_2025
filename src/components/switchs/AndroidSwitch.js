import {StyleSheet} from 'react-native';
import {Switch} from 'react-native-paper';

const AndroidSwicth = ({
  value,
  disabled,
  color,
  onValueChange,
  style,
} = props) => {
  return (
    <Switch
      value={value}
      disabled={disabled}
      color={color}
      onValueChange={onValueChange}
      style={[style]}
    />
  );
};

export default AndroidSwicth;
