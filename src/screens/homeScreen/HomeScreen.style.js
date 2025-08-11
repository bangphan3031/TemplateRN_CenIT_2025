import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: 15,
    gap: 10,
  },
  containerGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numberSelectListContainer: {
    borderColor: colors.black,
    borderRadius: 6,
    borderWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 8,
  },
  numberSelectItem: {
    flexDirection: 'column',
    width: '25%',
    marginBottom: 7,
  },
  numberSelectItemBtn: {
    position: 'relative',
    alignItems: 'center',
    marginHorizontal: 8,
    height: 'auto',
    borderRadius: 6,
    overflow: 'hidden',
    minHeight: 60,
  },
  numberSelectItemText: {
    color: colors.white,
    fontSize: 18,
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  noteItem: {
    width: 26,
    height: 26,
    borderRadius: 6,
  },
  noteItemCont: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
  infoAvatar: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  modalTitleCont: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 16,
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  modalTitle: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 18,
  },
  numberSelectItemBtnCont: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 28,
  },
  numberSelectItemTime: {
    color: colors.black,
    fontSize: 11,
  },
  numberSelectItemBtnTime: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  qrCodeCOnt: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },
  qrCode: {
    marginTop: 20,
  },
  qrCodeinfo: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageAvatar: {
    width: 150,
    height: 150,
  },
  selectTitle: {
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeScrollView: {
    padding: 10,
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'column',
    gap: 10,
    marginBottom: 20,
  },
  button: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
});
