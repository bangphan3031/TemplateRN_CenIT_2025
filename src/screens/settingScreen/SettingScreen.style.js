import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginBottom: 80,
  },
  card: {
    margin: 10,
  },
  contentCard: {
    marginHorizontal: 10,
    marginTop: 15,
  },
  divider: {
    marginHorizontal: 25,
    backgroundColor: colors.grey,
  },
  avatar: {
    backgroundColor: colors.grey,
    marginLeft: -5,
  },
});
