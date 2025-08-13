import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Linking,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import styles from './AgencyScreen.style';
import {getApp} from '@react-native-firebase/app';
import {
  getMessaging,
  requestPermission as fcmRequestPermission,
  registerDeviceForRemoteMessages,
  setAutoInitEnabled,
  getToken as fcmGetToken,
  AuthorizationStatus,
  onTokenRefresh,
} from '@react-native-firebase/messaging';
import {useEffect, useState} from 'react';
import DefaultButton from '../../components/buttons/DefaultButton';
import colors from '../../constants/colors';
import {useSelector, useDispatch} from 'react-redux';
import {getData, postData} from '../../services/requestDefaultAPI';
import 'text-encoding';
import DefaultText from '../../components/texts/DefaultText';
import {useNavigation} from '@react-navigation/native';
import {useLoading} from '../../providers/LoadingProvider';
import HeaderBar from '../../components/header/HeaderBar';
import ConfirmModal from '../../components/modals/ConfirmModal';
import {useToast} from '../../providers/ToastProvider';
import {ANDROID_VERSION, IOS_VERSION} from '../../constants/config';
import DropdownSearch from '../../components/dropdown/DropDownSearch';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {setWardId} from '../../actions/agencyAction';
import {setDeviceToken} from '../../actions/tokenAction';

// Initialize Firebase app & Messaging instance (modular API)
const app = getApp();
const m = getMessaging(app);

const AgencyScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();
  const {showToast} = useToast();
  const user = useSelector(state => state.userReducer.user);
  const [agencies, setAgencies] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmLocationModal, setOpenConfirmLocationModal] =
    useState(false);
  const [dataUpdate, setDataUpdate] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState();
  const [selectedWardId, setSelectedWardId] = useState();

  useEffect(() => {
    let unsubscribeTokenRefresh;

    const registerAppWithFCM = async () => {
      // iOS: ensure remote messages are enabled and auto-init
      if (Platform.OS === 'ios') {
        await registerDeviceForRemoteMessages(m);
        await setAutoInitEnabled(m, true);
      }
    };

    const ensureAndroidNotificationPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Notification permission denied on Android 13+');
          }
        } catch (e) {
          console.log('Request POST_NOTIFICATIONS error:', e);
        }
      }
    };

    const requestFcmPermissionLocal = async () => {
      try {
        await fcmRequestPermission(m);
        await getDeviceToken();
      } catch (error) {
        console.log('[FCM] Request Permission rejected ', error);
      }
    };

    const getDeviceToken = async () => {
      try {
        // Required on both platforms before getting a token
        await registerDeviceForRemoteMessages(m);
        await ensureAndroidNotificationPermission();
        const token = await fcmGetToken(m);
        console.log('FCM Token:', token);
        if (token) {
          dispatch(setDeviceToken(token));
        }
        // Subscribe to token refresh
        unsubscribeTokenRefresh = onTokenRefresh(m, newToken => {
          console.log('FCM Token refreshed:', newToken);
          dispatch(setDeviceToken(newToken));
        });
      } catch (error) {
        console.log('Get token error:', error);
      }
    };

    const checkPermission = async () => {
      console.log('Checking FCM permission...');
      try {
        const authStatus = await fcmRequestPermission(m);
        const enabled =
          authStatus === AuthorizationStatus.AUTHORIZED ||
          authStatus === AuthorizationStatus.PROVISIONAL;
        if (enabled) {
          await getDeviceToken();
        } else {
          await requestFcmPermissionLocal();
        }
      } catch (e) {
        console.log('Check permission error:', e);
      }
    };

    (async () => {
      await registerAppWithFCM();
      await checkPermission();
    })();

    return () => {
      if (typeof unsubscribeTokenRefresh === 'function') {
        unsubscribeTokenRefresh();
      }
    };
  }, [dispatch]);

  //Call api hiển thị danh sách xã, phường
  useEffect(() => {
    const getWards = async () => {
      const response = await getData('/api/BocSoVer2/DanhSachBPMC', {});
      showLoading();
      if (response.Status === 200) {
        const wardList = response.Data.map(ward => ({
          label: ward.TenBoPhan,
          value: ward.BoPhanID,
        }));
        setWards(wardList);
        hideLoading();
      }
    };
    getWards();
  }, []);
  useEffect(() => {
    if (selectedWardId !== null && selectedWardId !== undefined) {
      getAgencies(selectedWardId);
    }
  }, [selectedWardId]);
  useEffect(() => {
    getCurrentLocation();
  }, []);
  //Call api check config để hiển thị thông tin update app
  useEffect(() => {
    const getInfoUpdate = async () => {
      const response = await getData('/api/AppVerion/GetAllAppVersion', {});
      if (response.Status === 200) {
        console.log(response.Data);
        let data = response.Data;
        if (
          data !== null &&
          data !== undefined &&
          data.toString().trim() !== ''
        ) {
          setDataUpdate(data);
          if (Platform.OS === 'android') {
            data.map(key => {
              if (
                key.STR_KEY === 'VERSION_LAYSO_ANDROID_NUM' &&
                key.NUM_VALUE > ANDROID_VERSION
              ) {
                setOpenModal(true);
              }
            });
          } else {
            data.map(key => {
              if (
                key.STR_KEY === 'VERSION_LAYSO_IOS_NUM' &&
                key.NUM_VALUE > IOS_VERSION
              ) {
                console.log('2222');
                setOpenModal(true);
              }
            });
          }
        } else {
          setOpenModal(true);
        }
      }
    };
    getInfoUpdate();
  }, []);

  //Lấy vị trí qua định vị
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      try {
        // Yêu cầu quyền vị trí cho iOS
        const authStatus = await Geolocation.requestAuthorization('whenInUse');
        
        if (authStatus === 'granted' || authStatus === 'whenInUse') {
          return true;
        } else {
          console.log('iOS Location permission denied:', authStatus);
          showToast({
            type: 'error',
            text1: 'Quyền truy cập vị trí',
            text2: 'Vui lòng cấp quyền truy cập vị trí trong Cài đặt để sử dụng tính năng này.',
          });
          // Có thể mở Settings để người dùng cấp quyền
          setTimeout(() => {
            Linking.openSettings();
          }, 2000);
          return false;
        }
      } catch (error) {
        console.error('iOS Location permission error:', error);
        return false;
      }
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Yêu cầu quyền truy cập vị trí',
          message: 'Ứng dụng cần quyền để truy cập vị trí của bạn',
          buttonNeutral: 'Hỏi lại sau',
          buttonNegative: 'Hủy',
          buttonPositive: 'Đồng ý',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };
  const normalize = str => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  };
  const findWardId = wardNameFromMap => {
    if (!wardNameFromMap) {
      return null;
    }

    const normalizedInput = normalize(wardNameFromMap);

    const match = wards.find(ward => normalize(ward.label) === normalizedInput);

    return match ? match.value : null;
  };

  const reverseGeocode = async (lat, lon) => {
    try {
      showLoading();
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`,
        {
          timeout: 10000,
          headers: {
            'User-Agent': 'LaySoTuXa/1.0',
          },
        }
      );
      
      if (response.data && response.data.address) {
        const address = response.data.address;
        // Thử lấy địa chỉ theo thứ tự ưu tiên
        const wardName = address.county || address.district || address.city || address.state;
        
        if (wardName) {
          setSelectedWard(wardName);
          setOpenConfirmLocationModal(true);
          console.log('Địa chỉ được tìm thấy:', wardName);
        } else {
          showToast({
            type: 'warning',
            text1: 'Không xác định được địa chỉ',
            text2: 'Vui lòng chọn xã/phường thủ công.',
          });
        }
      } else {
        showToast({
          type: 'warning',
          text1: 'Không tìm thấy địa chỉ',
          text2: 'Vui lòng chọn xã/phường thủ công.',
        });
      }
    } catch (error) {
      console.error('Lỗi reverse geocoding:', error.message);
      showToast({
        type: 'error',
        text1: 'Lỗi xác định địa chỉ',
        text2: 'Không thể xác định địa chỉ từ tọa độ. Vui lòng chọn thủ công.',
      });
    } finally {
      hideLoading();
    }
  };

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      showToast({
        type: 'error',
        text1: 'Không có quyền truy cập vị trí',
        text2: 'Vui lòng cấp quyền để ứng dụng có thể xác định vị trí của bạn.',
      });
      return;
    }
    
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('Vị trí hiện tại:', latitude, longitude);
        reverseGeocode(latitude, longitude);
      },
      error => {
        console.error('Lỗi vị trí:', error.message, error.code);
        let errorMessage = 'Không thể lấy vị trí hiện tại.';
        
        switch (error.code) {
          case 1:
            errorMessage = 'Quyền truy cập vị trí bị từ chối. Vui lòng kiểm tra cài đặt.';
            break;
          case 2:
            errorMessage = 'Không thể xác định vị trí. Vui lòng kiểm tra kết nối mạng.';
            break;
          case 3:
            errorMessage = 'Hết thời gian chờ khi lấy vị trí.';
            break;
          default:
            errorMessage = `Lỗi vị trí: ${error.message}`;
        }
        
        showToast({
          type: 'error',
          text1: 'Lỗi định vị',
          text2: errorMessage,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    );
  };

  const getAgencies = async id => {
    try {
      showLoading();
      const response = await postData(
        `/api/BocSoVer2/DanhSachLinhVuc?BoPhanID=${id}`,
        {},
      );
      if (response.Status === 200) {
        setAgencies(response.Data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách lĩnh vực:', error);
    } finally {
      hideLoading();
    }
  };
  const handleSelectWard = value => {
    console.log('Xã/Phường được chọn:', value);
    setSelectedWardId(value);
  };
  const confirmLocation = () => {
    console.log('đúng rồi đây là địa chỉ của tui');
    const foundWardId = findWardId(selectedWard);

    if (foundWardId) {
      setSelectedWardId(foundWardId);
      dispatch(setWardId(foundWardId));
    } else {
      showToast({
        type: 'error',
        text1: 'Không tìm thấy Phường/Xã',
        text2: 'Không có Phường/Xã trong danh mục.',
      });   
    }
    setOpenConfirmLocationModal(false);
  };

  const clickUpdateVersion = (data, platform) => {
    if (data !== null && data !== undefined && data.toString().trim() !== '') {
      if (platform === 'android') {
        data.map(key => {
          if (key.STR_KEY === 'LINK_ANDROID') {
            Linking.openURL(key.STR_VALUE);
          }
        });
      } else {
        data.map(key => {
          if (key.STR_KEY === 'LINK_IOS') {
            Linking.openURL(key.STR_VALUE);
          }
        });
      }
    } else {
      showToast({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Hiện tại chưa thể cập nhật ứng dụng.',
      });
    }
  };
  const onRefresh = async () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  };
  return (
    <View style={styles.container}>
      <HeaderBar title="CHỌN LĨNH VỰC" hideBack />
      <ScrollView
        style={styles.homeScrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <View style={styles.header}>
            <DefaultText fontWeight={700} text={'Xin chào, '} />
            <TouchableOpacity onPress={() => navigation.navigate('UserInfo')}>
              <DefaultText
                fontWeight={700}
                fontSize={15}
                color={colors.primary}
                text={user?.name}
              />
            </TouchableOpacity>
          </View>
          <View>
            <DropdownSearch
              data={wards}
              value={selectedWardId}
              onChange={e => {
                handleSelectWard(e.value);
              }}
              placeholder="Chọn xã/phường"
              searchPlaceholder="Tìm kiếm..."
            />
            {/* <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 8,
                paddingHorizontal: 15,
                borderRadius: 8,
                marginTop: 10,
                alignSelf: 'flex-start',
              }}
              onPress={getCurrentLocation}>
              <DefaultText
                color={colors.white}
                fontSize={14}
                fontWeight={600}
                text="📍 Lấy vị trí hiện tại"
              />
            </TouchableOpacity> */}
          </View>
          <DefaultText
            fontSize={16}
            text="Bước 1: Chọn lĩnh vực"
            style={{marginTop: 10}}
          />
          <View style={styles.buttonsContainer}>
            {agencies.map(agency => (
              <DefaultButton
                key={agency.LinhVuc_ID}
                title={agency.TenLinhVuc}
                onPress={() =>
                  navigation.navigate('HomeScreen', {agency: agency, boPhanID: selectedWardId})
                }
                style={{borderRadius: 10}}
                height={45}
                width={400}
                titleStyle={{
                  fontWeight: 'bold',
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <ConfirmModal
        isOpen={openConfirmLocationModal}
        type={'success'}
        title={'Xác nhận địa chỉ'}
        message={`Bạn muốn lấy số ở ${selectedWard}?`}
        setIsOpen={setOpenConfirmLocationModal}
        onSubmit={() => confirmLocation()}
      />
      <ConfirmModal
        isOpen={openModal}
        type={'success'}
        title={'Cập nhật ứng dụng'}
        message={'Đã có phiên bản mới. Bạn có muốn cập nhật ứng dụng?'}
        setIsOpen={setOpenModal}
        onSubmit={() => clickUpdateVersion(dataUpdate, Platform.OS)}
      />
    </View>
  );
};

export default AgencyScreen;
