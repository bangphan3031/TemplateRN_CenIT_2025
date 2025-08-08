import {Portal} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';
import DefaultButton from '../buttons/DefaultButton';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';
import colors from '../../constants/colors';
import {Icon} from 'react-native-paper';
import DefaultText from '../texts/DefaultText';

const ConfirmModal = ({
  isOpen,
  setIsOpen,
  type = 'primary',
  title,
  message,
  onSubmit,
  onDismiss,
} = props) => {
  const {t} = useTranslation();

  const onCloseModal = () => {
    onDismiss && onDismiss();
    setIsOpen(false);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'check';
      case 'danger':
        return 'close';
      case 'warning':
        return 'alert-outline';
      default:
        return 'help';
    }
  };

  return (
    <Portal>
      <Modal isVisible={isOpen} style={styles.modal}>
        <View style={styles.modalContainer}>
          <View style={styles.titleBannerContainer}>
            <View
              style={[
                styles.titleBanner,
                {
                  backgroundColor: colors[type],
                },
              ]}>
              <Icon size={50} source={getIcon()} color={colors.white} />
            </View>
          </View>
          <DefaultText style={styles.title} text={title}></DefaultText>
          <DefaultText style={styles.message} text={message}></DefaultText>
          <View style={styles.modalFooter}>
            <DefaultButton
              type="secondary"
              mode={'outlined'}
              title={t('button.no')}
              style={styles.footerButton}
              onPress={onCloseModal}
            />
            <DefaultButton
              title={t('button.yes')}
              onPress={onSubmit}
              style={styles.footerButton}
              type={type}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {},
  modalContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    paddingVertical: 16,
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

export default ConfirmModal;
