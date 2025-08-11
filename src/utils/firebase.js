import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

// hàm lấy device token
export async function getToken() {
  let tokenDevice = null;
  try {
    await messaging().setAPNSToken('apnsToken');
    await messaging().requestPermission();
    await messaging().registerDeviceForRemoteMessages();
    // await checkApplicationNotificationPermission();
    // await registerAppWithFCM();
    await messaging()
      .getToken()
      .then(token => {
        // console.log('Device token:', token);
        // Tải token này lên server để sử dụng khi gửi thông báo
        tokenDevice = token;
      });

    // const token = await messaging().getToken();
    return tokenDevice;
  } catch (error) {
    console.error('Error getting device token:', error);
    return tokenDevice;
  }
}

// hàm trả về thông báo từ firebase
export async function getMessage() {
  return new Promise((resolve, reject) => {
    // Đăng ký lắng nghe thông báo
    messaging().onMessage(async remoteMessage => {
      console.log('Received foreground notification', remoteMessage);
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
      resolve(remoteMessage); // Trả về thông báo từ sự kiện onMessage
    });

    // Thiết lập message handler cho background message
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Received background notification', remoteMessage);
      resolve(remoteMessage); // Trả về thông báo từ sự kiện setBackgroundMessageHandler
    });
  });
}
