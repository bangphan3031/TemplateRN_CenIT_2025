import {ActivityIndicator} from 'react-native-paper';
import colors from '../../constants/colors';
import {View} from 'react-native';

const Loading = ({isLoading, children, style} = props) => {
  return (
    <View style={style}>
      {isLoading ? (
        <ActivityIndicator animating={true} color={colors.primary} />
      ) : (
        children
      )}
    </View>
  );
};

export default Loading;
