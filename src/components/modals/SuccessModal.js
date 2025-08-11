import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {IconButton} from 'react-native-paper';
import DefaultText from '../texts/DefaultText';
import colors from '../../constants/colors';
import moment from 'moment';

const SuccessModal = ({isVisible, onClose, data, minute}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <View style={styles.modalContent}>
        {/* Header với tiêu đề căn giữa và icon đóng */}
        <View style={styles.header}>
          <DefaultText
            text="Đặt số thành công"
            fontSize={18}
            fontWeight={700}
            style={{marginTop: -5}}
          />
          <IconButton
            icon="close" // Biểu tượng đóng
            onPress={onClose}
            style={styles.closeButton}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.row}>
            <Text>
              <DefaultText text="Lĩnh vực: " />
              <DefaultText
                text={data?.LinhVuc}
                color={colors.primary}
                fontWeight={700}
              />
            </Text>
          </View>
          <View style={styles.row}>
            <DefaultText text="Số phiếu: " />
            <DefaultText
              text={data?.SoPhieu}
              color={colors.orange}
              fontWeight={700}
            />
          </View>
          <View style={styles.row}>
            <Text>
              <DefaultText text="Thời gian: " />
              <DefaultText
                text={`${moment(data?.BatDau).format(
                  'DD/MM/YYYY HH:mm',
                )} - ${moment(data?.KetThuc).format('HH:mm')} ${
                  data?.Buoi === 'SA' ? 'Sáng' : 'Chiều'
                }`}
                color={colors.purple}
                fontWeight={700}
              />
            </Text>
          </View>
          <View style={styles.row}>
            <DefaultText text="Phường/Xã: " />
            <DefaultText
              text={data?.TenBoPhan}
              color={colors.black}
              fontWeight={700}
            />
          </View>
          <View style={styles.row}>
            <DefaultText text="Mã xác nhận: " />
            <DefaultText
              text={data?.MaXacNhan}
              color={colors.danger}
              fontWeight={700}
            />
          </View>
          <Text style={styles.warning}>
            Quý khách vui lòng có mặt tại bộ phận Một cửa trước {minute} phút
            -&gt; đến máy bấm số -&gt; nhập mã xác nhận để nhận số.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  content: {
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
  },
  warning: {
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});

export default SuccessModal;
