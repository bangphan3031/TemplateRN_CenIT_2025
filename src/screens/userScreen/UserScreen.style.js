import {Dimensions, StyleSheet} from 'react-native';
import {red100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import colors from '../../constants/colors';

const {width, height} = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    resizeMode: 'cover',
    zIndex: 5,
    flex: 1,
    backgroundColor: colors.white,
  },

  content: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginBottom: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    marginVertical: 0,
    alignItems: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  appTitle: {
    marginBottom: 202,
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
  },
  loginForm: {},
  submitButton: {
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    gap: 10,
    bottom: 0,
  },
  modalTitleCont: {
    position: 'relative',
    paddingVertical: 16,
    backgroundColor: colors.primary,
  },
  modalTitle: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  forcusCamera: {
    zIndex: 10,
    position: 'absolute',
    top: height / 5,
    left: width / 4,
    width: width / 2,
    height: width / 2,
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  descContainer: {
    width: width - 40,
    top: '70%',
    zIndex: 10,
    position: 'absolute',
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});
