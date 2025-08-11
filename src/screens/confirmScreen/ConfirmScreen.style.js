import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  infoCont: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 6,
    margin: 15,
    marginHorizontal: 20,
    marginBottom: 5,
    gap: 4,
    padding: 12,
  },
  infoTitle: {
    color: colors.black,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoText: {
    color: colors.black,
    fontSize: 17,
  },
  minuteInput: {
    fontSize: 20,
    color: colors.danger,
    borderBottomWidth: 0, // Bỏ đường viền dưới
    borderWidth: 0, // Bỏ toàn bộ đường viền
    padding: 0, // Loại bỏ khoảng cách thừa
    margin: 0,
  },
  minuteMess: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  confirmButton: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 40,
  },
  phoneModalMessage: {
    fontSize: 16,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  phoneInputContainer: {
    marginBottom: 10,
  },
  phoneInputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
    marginBottom: 8,
    marginLeft: 5,
  },
  phoneInput: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.black,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  phoneErrorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
});
