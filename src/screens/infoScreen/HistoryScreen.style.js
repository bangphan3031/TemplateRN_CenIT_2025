import {Platform, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  dropdownContainer: {
    marginTop: 10,
  },
  loadingContainer: {
    height: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  cardList: {
    marginBottom: Platform.OS === 'ios' ? 150 : 0,
  }
});
