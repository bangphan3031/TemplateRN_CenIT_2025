import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card} from 'react-native-paper';
import colors from '../../constants/colors';
import DefaultText from '../texts/DefaultText';
import moment from 'moment';

const HistoryCard = ({
  Phieu_ID,
  SoPhieu,
  TenLinhVuc,
  TenBoPhan,
  NgayThucHien,
  MaXacNhan,
  Buoi,
  TrangThaiXuLy,
}) => {
  // Hàm xử lý hiển thị trạng thái
  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return 'Chưa xử lý';
      case 2:
        return 'Chưa xử lý';
      case 3:
        return 'Đã xử lý';
      case 4:
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  // Hàm xử lý màu sắc theo trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return colors.orange;
      case 2:
        return colors.orange; // Chưa xử lý - màu cam
      case 3:
        return colors.success || colors.primary; // Đã xử lý - màu xanh
      case 4:
        return colors.danger; // Đã hủy - màu đỏ
      default:
        return colors.gray;
    }
  };
  return (
    <>
      <Card style={styles.card}>
        <View style={styles.container}>
          <View style={styles.row}>
            <DefaultText text="Số phiếu: " />
            <DefaultText
              text={SoPhieu}
              color={colors.orange}
              fontWeight={700}
            />
          </View>
          <View style={styles.row}>
            <DefaultText text="Lĩnh vực: " />
            <DefaultText
              text={TenLinhVuc}
              color={colors.primary}
              fontWeight={700}
            />
          </View>
          <View style={styles.row}>
            <DefaultText text="Bộ phận: " />
            <DefaultText
              text={TenBoPhan}
              color={colors.black}
              fontWeight={700}
            />
          </View>
          <View style={styles.row}>
            <DefaultText text="Ngày thực hiện: " />
            <DefaultText
              text={`${moment(NgayThucHien).format('DD/MM/YYYY')} - ${
                Buoi === 'SA' ? 'Sáng' : 'Chiều'
              }`}
              color={colors.purple}
              fontWeight={700}
            />
          </View>
          <View style={styles.row}>
            <DefaultText text="Mã xác nhận: " />
            <DefaultText
              text={MaXacNhan}
              color={colors.danger}
              fontWeight={700}
            />
          </View>
          <View style={styles.row}>
            <DefaultText text="Trạng thái: " />
            <DefaultText
              text={getStatusText(TrangThaiXuLy)}
              color={getStatusColor(TrangThaiXuLy)}
              fontWeight={700}
            />
          </View>
        </View>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  row: {
    flexDirection: 'row',
  },
});

export default HistoryCard;
