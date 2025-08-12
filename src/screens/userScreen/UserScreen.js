import Loading from '../../components/loadings/Loading';
import {useEffect, useState} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {useWindowDimensions} from 'react-native';
import styles from './UserScreen.style';
import DefaultText from '../../components/texts/DefaultText';
import colors from '../../constants/colors';
import {useDispatch} from 'react-redux';
import {setUser} from '../../actions/userAction';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

const UserScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const {width, height} = useWindowDimensions();
  const dispatch = useDispatch();
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const [zoom, setZoom] = useState(2.0);

  useEffect(() => {
    const checkPermission = async () => {
      if (!hasPermission) {
        await requestPermission();
      }
      setCameraReady(true);
    };
    checkPermission();
  }, [hasPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (!codes || codes.length === 0 || !codes[0].value) {
        console.error('Invalid QR code scanned');
        return;
      }

      try {
        const data = codes[0].value;
        console.log('Scanned data:', data);
        const infos = data.split('|');

        if (infos.length >= 5) {
          dispatch(
            setUser({
              cccd: infos[0],
              cmnd: infos[1],
              name: infos[2],
              birthday: infos[3],
              gender: infos[4],
              address: infos[5] || '',
            }),
          );
        } else {
          Alert.alert('Mã QR không hợp lệ!');
        }
      } catch (error) {
        console.error('Error processing scanned code:', error);
      }
    },
  });

  if (!cameraReady) {
    return (
      <View>
        <Text>Đang kiểm tra quyền...</Text>
      </View>
    );
  }

  if (device == null) {
    return (
      <View>
        <Text>Không tìm thấy thiết bị camera</Text>
      </View>
    );
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <ScrollView
        style={styles.container}
        automaticallyAdjustKeyboardInsets={true}>
        <View style={styles.modalTitleCont}>
          <Text style={styles.modalTitle}>{'Đăng ký thông tin'}</Text>
        </View>
        <View style={[styles.main]}>
          <View style={styles.loginForm}>
            <Camera
              style={{width: '100%', borderRadius: 10, height: height - 56}}
              codeScanner={codeScanner}
              device={device}
              isActive={true}
              zoom={zoom}
            />
            <View style={styles.forcusCamera} />
            <View style={styles.descContainer}>
              <DefaultText
                style={{padding: 10, textAlign: 'center'}}
                fontWeight={700}
                fontSize={18}
                color={colors.white}
                text="Vui lòng quét QR code của CCCD để lấy thông tin người dùng bốc số"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default UserScreen;
