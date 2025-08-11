import React, {useEffect} from 'react';
import {View, ScrollView, Image, Dimensions} from 'react-native';
import DefaultButton from '../../components/buttons/DefaultButton';
import {useNavigation} from '@react-navigation/native';
import styles from './InstructScreen.style';
import DefaultText from '../../components/texts/DefaultText';
import {useDispatch} from 'react-redux';
import {setDeviceToken} from '../../actions/tokenAction';
import {getToken, getMessage} from '../../utils/firebase';
import messaging from '@react-native-firebase/messaging';

const InstructScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {width, height} = Dimensions.get('window');

  useEffect(() => {
    const checkPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      console.log('Authorization status:', enabled);
      if (enabled) {
        // User has permissions\
        getDeviceToken();
      } else {
        // User doesn't have permission
        requestPermission();
      }
    };

    const registerAppWithFCM = async () => {
      if (Platform.OS === 'ios') {
        await messaging().registerDeviceForRemoteMessages();
        await messaging().setAutoInitEnabled(true);
        //await messaging().setAPNSTokenType(messaging.APNSTokenType.SANDBOX);
      }
    };

    const requestPermission = async () => {
      messaging()
        .requestPermission()
        .then(() => {
          getDeviceToken();
        })
        .catch(error => {
          console.log('[FCMService] Request Permission rejected ', error);
        });
    };

    const getDeviceToken = async () => {
      try {
        //await messaging().registerDeviceForRemoteMessages();
        messaging()
          .getToken()
          .then(fcmToken => {
            if (fcmToken) {
              dispatch(setDeviceToken(fcmToken));
            } else {
              console.log('[FCMService] User does not have a device token');
            }
          })
          .catch(error => {
            console.log('[FCMService] getToken rejected ', error);
          });
        await getMessage();
      } catch (error) {
        console.error('Error getting device token:', error);
      }
    };

    registerAppWithFCM();
    checkPermission();
    return () => {};
  });

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
        }}
        automaticallyAdjustKeyboardInsets={true}>
        <View style={styles.content}>
          <Image
            source={require('../../assets/images/avatars/ticket.jpg')}
            style={[
              styles.image,
              {width: width - 20, height: 120, marginTop: 30},
            ]}
            resizeMode="contain"
          />
          <DefaultText
            text="Lấy số từ xa"
            fontSize={36}
            fontWeight={700}
            style={styles.title}
          />
          <DefaultButton
            title="Đăng ký thông tin"
            height={50}
            width={width - 20}
            onPress={() => {
              navigation.navigate('UserScreen');
            }}
            type="primary"
            style={styles.button}
            titleStyle={{
              fontSize: 16,
            }}
          />
          <Image
            source={require('../../assets/images/avatars/cccd.jpg')}
            style={{width: width - 20, height: 220, borderRadius: 5}}
            resizeMode="stretch"
          />
          <DefaultText
            text="Đưa camera vào phần mã vạch QR Code trên căn cước để quét mã và đăng ký thông tin"
            fontSize={16}
            fontWeight={700}
            style={styles.text}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default InstructScreen;
