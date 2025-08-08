import React from 'react';
import {IconButton, Portal} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import DefaultButton from '../buttons/DefaultButton';
import Modal from 'react-native-modal';
import colors from '../../constants/colors';
import DefaultText from '../texts/DefaultText';

const FormModal = ({
  isOpen,
  setIsOpen,
  onSubmit,
  onDismiss,
  title,
  children,
} = props) => {
  const {t} = useTranslation();

  const onCloseModal = () => {
    console.log(onDismiss);
    onDismiss && onDismiss();
    setIsOpen(false);
  };

  return (
    <Portal>
      <Modal isVisible={isOpen} style={styles.modal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <DefaultText
              text={title}
              fontWeight={'bold'}
              style={styles.modalHeaderTitle}></DefaultText>
            <IconButton
              icon={'close'}
              iconColor={colors.white}
              size={18}
              onPress={onCloseModal}
            />
          </View>
          <View style={styles.modalBody}>{children}</View>
          <View style={styles.modalFooter}>
            <DefaultButton
              type="secondary"
              mode={'outlined'}
              title={t('button.cancel')}
              onPress={onCloseModal}
              style={styles.footerButton}
            />
            <DefaultButton
              title={t('button.save')}
              onPress={onSubmit}
              style={styles.footerButton}
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
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingVertical: 6,
  },
  modalHeaderTitle: {
    color: '#000',
    fontSize: 17,

    marginLeft: 16,
  },
  modalBody: {
    padding: 16,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 6,
    marginBottom: 16,
  },
  footerButton: {
    width: '40%',
  },
});
export default FormModal;
