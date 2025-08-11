import {IconButton, Portal} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';
import DefaultButton from '../buttons/DefaultButton';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';
import colors from '../../constants/colors';
import {Icon} from 'react-native-paper';
import DefaultText from '../texts/DefaultText';

const FullSizeModal = ({
  isOpen,
  setIsOpen,
  children,
  title,
  onClose
} = props) => {

  const onCloseModal = () => {
    onClose()
    setIsOpen(false);
  };


  return (
    <Portal >
      <Modal isVisible={isOpen} style={styles.modal} animationIn={"slideInRight"} animationOut={"slideOutLeft"} animationInTiming={600}>
        <View style={styles.modalTitleCont}>
            <Text  style={styles.modalTitle}>{title}</Text>
            <IconButton icon={"arrow-left"} size={30} iconColor={colors.white} style={styles.modalBackBtn} onPress={onCloseModal} />
        </View>
        {children}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: colors.white,
    margin: 0,
    justifyContent: 'flex-start'
  },
  modalContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    paddingVertical: 16,
  },
  modalTitleCont: {
    position: 'relative',
    paddingVertical: 16,
    backgroundColor: colors.primary
  },
  modalTitle: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18
  },
  modalBackBtn: {
    position: 'absolute'
  }, 
  titleBannerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  titleBanner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: colors.black,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  footerButton: {
    width: '40%',
  },
});

export default FullSizeModal;
