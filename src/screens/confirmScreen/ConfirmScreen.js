import {
  View,
  Text,
  TextInput,
  ScrollView,
  useWindowDimensions,
  Alert,
} from 'react-native';
import styles from './ConfirmScreen.style';
import {useState, useRef, useEffect} from 'react';
import DefaultButton from '../../components/buttons/DefaultButton';
import {useDispatch, useSelector} from 'react-redux';
import {postData} from '../../services/requestDefaultAPI';
import moment from 'moment';
import 'text-encoding';
import {useLoading} from '../../providers/LoadingProvider';
import {useToast} from '../../providers/ToastProvider';
import {
  reloadData,
  setOpenModal,
  setSuccessData,
} from '../../actions/dataAction';
import {updatePhone} from '../../actions/userAction';
import {useNavigation} from '@react-navigation/native';
import HeaderBar from '../../components/header/HeaderBar';
import FormModal from '../../components/modals/FormModal';
import DefaultInput from '../../components/inputs/DefaultInput';

const ConfirmScreen = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {selectedItem, session, registerDate, agency, boPhanID} = route.params;
  const {showToast} = useToast();
  const {width, height} = useWindowDimensions();
  const {showLoading, hideLoading} = useLoading();
  const user = useSelector(state => state.userReducer.user);
  const deviceToken = useSelector(state => state.tokenReducer.deviceToken);
  const [minute, setMinute] = useState('30');
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const phoneInputRef = useRef(null);
  const parsedRegisterDate = new Date(registerDate);

  // Auto focus vào input khi modal mở
  useEffect(() => {
    if (showPhoneModal && phoneInputRef.current) {
      setTimeout(() => {
        phoneInputRef.current.focus();
      }, 100);
    }
  }, [showPhoneModal]);

  const validatePhoneNumber = (phone) => {
    // Kiểm tra số điện thoại Việt Nam (10-11 số, bắt đầu bằng 0)
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8,9})$/;
    return phoneRegex.test(phone);
  };

  const handlePhoneSubmit = () => {
    if (!phoneNumber.trim()) {
      setPhoneError('Vui lòng nhập số điện thoại');
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError('Số điện thoại không hợp lệ');
      return;
    }
    dispatch(updatePhone(phoneNumber));
    setShowPhoneModal(false);
    setPhoneError('');
    // Tiếp tục thực hiện đăng ký
    proceedWithRegistration();
  };

  const proceedWithRegistration = async () => {
    showLoading();
    var formData = {
      SoPhieu: selectedItem.SoPhieu,
      HoTenNguoiDan: user?.name,
      SoCCCD: user?.cccd,
      // SoDienThoai: user?.phone,
      Buoi: session,
      NgayDangKy: parsedRegisterDate,
      DeviceToken: deviceToken,
      SoPhut: minute,
      boPhanID: boPhanID,
    };

    var response = await postData('/api/BocSoVer2/TaoPhieu', formData);
    hideLoading();
    if (response.Status === 200) {
      dispatch(
        setSuccessData({
          SoPhieu: response.Data?.SoPhieu,
          BatDau: response.Data?.BatDau,
          KetThuc: response.Data?.KetThuc,
          MaXacNhan: response.Data?.MaXacNhan,
          LinhVuc: response.Data?.TenLinhVuc,
          Buoi: response.Data?.Buoi,
          Minute: minute,
          TenBoPhan: response.Data?.TenBoPhan
        }),
      );
      dispatch(reloadData());
      dispatch(setOpenModal(true));
      navigation.goBack();
    } else {
      showToast({
        type: 'error',
        text1: 'Lấy số',
        text2: response.Message,
      });
    }
  };

  const confirmRegisterData = async () => {
    // Kiểm tra số điện thoại
    // if (!user?.phone) {
    //   setShowPhoneModal(true);
    //   return;
    // }
    
    // Nếu có số điện thoại, tiếp tục đăng ký
    await proceedWithRegistration();
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="XÁC NHẬN ĐĂNG KÝ" />
      <ScrollView
        style={{
          flex: 1,
        }}
        automaticallyAdjustKeyboardInsets={true}>
        <View style={styles.infoCont}>
          <Text style={styles.infoTitle}>Thông tin cá nhân</Text>
          <Text style={styles.infoText}>Người đăng ký: {user?.name}</Text>
          <Text style={styles.infoText}>CCCD: {user?.cccd}</Text>
          <Text style={styles.infoText}>Địa chỉ: {user?.address}</Text>
        </View>
        <View style={styles.infoCont}>
          <Text style={styles.infoTitle}>Thông tin đặt số</Text>
          <Text style={styles.infoText}>Số phiếu: {selectedItem?.SoPhieu}</Text>
          <Text style={styles.infoText}>Lĩnh vực: {agency?.TenLinhVuc}</Text>
          <Text style={styles.infoText}>
            {`Thời gian: ${moment(selectedItem?.BatDau).format(
              'DD/MM/YYYY HH:mm',
            )} - ${moment(selectedItem?.KetThuc).format('HH:mm')}`}
          </Text>
        </View>
        <View style={styles.infoCont}>
          <Text style={styles.infoTitle}>Nhập thời gian thông báo nhắc nhở</Text>
          <View style={styles.minuteMess}>
            <Text style={[styles.infoText]}>* Nhận thông báo trước </Text>
            <TextInput
              value={minute}
              onChangeText={setMinute}
              style={styles.minuteInput}
              inputMode="numeric"
              selectTextOnFocus={true}
            />
            <Text style={[styles.infoText]}> phút</Text>
          </View>
        </View>
        <DefaultButton
          width={width - 20}
          title={'Xác nhận đăng ký'}
          style={styles.confirmButton}
          height={60}
          onPress={confirmRegisterData}
          type="success"
          titleStyle={{
            fontSize: 20,
            fontWeight: 'bold',
          }}
        />
      </ScrollView>
      
      {/* Modal nhập số điện thoại */}
      <FormModal
        isOpen={showPhoneModal}
        setIsOpen={setShowPhoneModal}
        title="Nhập số điện thoại"
        onSubmit={handlePhoneSubmit}
        onDismiss={() => {
          setShowPhoneModal(false);
          setPhoneError('');
          setPhoneNumber('');
        }}>
        <Text style={styles.phoneModalMessage}>
          Bạn cần nhập số điện thoại để lấy số
        </Text>
        <View style={styles.phoneInputContainer}>
          <Text style={styles.phoneInputLabel}>Số điện thoại</Text>
          <TextInput
            ref={phoneInputRef}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
            style={styles.phoneInput}
            autoFocus={true}
            placeholderTextColor="#999"
          />
          {phoneError ? (
            <Text style={styles.phoneErrorText}>{phoneError}</Text>
          ) : null}
        </View>
      </FormModal>
    </View>
  );
};

export default ConfirmScreen;
