import {StyleSheet} from 'react-native';
import {Badge} from 'react-native-paper';
import DefaultText from '../texts/DefaultText';

const DefaultBadge = ({type, size, value, style} = props) => {
  return (
    <Badge type={type} size={size} style={[style]}>
      <DefaultText>{value}</DefaultText>
    </Badge>
  );
};

export default DefaultBadge;
