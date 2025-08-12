import {Platform, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeScrollView: {
    padding: 10,
    marginBottom: Platform.OS === 'ios' ? 90 : 70,
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'column',
    gap: 10,
    marginBottom: 20,
  },
});
