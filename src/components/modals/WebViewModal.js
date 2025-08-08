import React from 'react';
import {IconButton, Portal} from 'react-native-paper';
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {useTranslation} from 'react-i18next';
import DefaultButton from '../buttons/DefaultButton';
import Modal from 'react-native-modal';
import colors from '../../constants/colors';
import DefaultText from '../texts/DefaultText';
import RenderHTML, {
  HTMLContentModel,
  HTMLElementModel,
} from 'react-native-render-html';
import WebView from 'react-native-webview';

const WebViewModal = ({isOpen, setIsOpen, url} = props) => {
  return (
    <Portal>
      <Modal isVisible={isOpen} style={styles.modal}>
        <View style={styles.modalContainer}>
          <IconButton
            icon={'close'}
            iconColor={colors.white}
            size={18}
            onPress={() => setIsOpen(false)}
            style={styles.closeButton}
          />
          <WebView
            source={{
              uri: url,
            }}
          />
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {},
  modalContainer: {
    flex: 1,
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginVertical: 50,
    borderRadius: 10,
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
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: colors.secondary,
    zIndex: 1000,
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
export default WebViewModal;
