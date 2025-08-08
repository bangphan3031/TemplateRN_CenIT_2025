import {StyleSheet} from 'react-native';
import {Chip} from 'react-native-paper';
import {Text} from 'react-native';
import DefaultText from '../texts/DefaultText';

const DefaultChip = ({
  type,
  title,
  selected,
  onPress,
  style,
  icon,
  disabled,
} = props) => {
  return (
    <Chip
      type={type}
      selected={selected}
      icon={icon ? icon : ''}
      disabled={disabled}
      onPress={onPress}
      style={[style]}>
      <DefaultText>{title}</DefaultText>
    </Chip>
  );
};

export default DefaultChip;
