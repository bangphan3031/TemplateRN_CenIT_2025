import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

export default styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    resizeMode: 'cover',
    zIndex: 5,
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: 10,
    alignItems: 'center',
  },
  title: {
    marginVertical: 30,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
  button: {
    borderRadius: 5,
    marginBottom: 30,
  },
});
