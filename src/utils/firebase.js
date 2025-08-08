import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export async function getToken() {
  const token = await messaging().getToken();
  console.log('Device Token 1:', token);
}

export function getMessage() {
  // Đăng ký lắng nghe thông báo
  messaging().onMessage(async remoteMessage => {
    console.log('Received foreground notification', remoteMessage);
  });

  // Thiết lập message handler cho background message
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Received background notification', remoteMessage);
  });
}
