import styles from './SettingScreen.style';
import React from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, Card, IconButton, MD3LightTheme} from 'react-native-paper';
import {removeUser} from '../../actions/userAction';
import {setAgency} from '../../actions/agencyAction';
import {useNavigation} from '@react-navigation/native';
import colors from '../../constants/colors';
import HeaderBar from '../../components/header/HeaderBar';

const SettingScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);
  const navigation = useNavigation();
  const avatarSource = require('../../assets/images/avatars/DefaultAvatar.jpg');

  const handleLogout = async () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có muốn thoát khỏi ứng dụng?',
      [
        {
          text: 'Hủy',
        },
        {
          text: 'Thoát',
          onPress: async () => {
            try {
              dispatch(removeUser());
              dispatch(setAgency(null));
            } catch (error) {
              console.error('Lỗi khi đăng xuất:', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="KHÁC" hideBack />
      <ScrollView>
        <View style={styles.content}>
          <Card theme={MD3LightTheme} style={{margin: 10, marginBottom: 20}}>
            <TouchableOpacity onPress={() => navigation.navigate('UserInfo')}>
              <Card.Title
                title={user?.name}
                left={props => (
                  <Avatar.Image
                    {...props}
                    size={40}
                    source={avatarSource}
                    style={styles.avatar}
                  />
                )}
                right={props => <IconButton {...props} icon="chevron-right" />}
              />
            </TouchableOpacity>
          </Card>
          <Card theme={MD3LightTheme} style={styles.card}>
            <TouchableOpacity
              onPress={() => navigation.navigate('PolicyScreen')}>
              <Card.Title
                title="Chính sách & quyền riêng tư"
                left={props => (
                  <Avatar.Icon
                    {...props}
                    icon="lock-outline"
                    style={[styles.icon, {backgroundColor: colors.purple}]}
                  />
                )}
              />
            </TouchableOpacity>
          </Card>
          <Card theme={MD3LightTheme} style={styles.card}>
            <TouchableOpacity
              onPress={() => navigation.navigate('TermsScreen')}>
              <Card.Title
                title="Điều khoản sử dụng"
                left={props => (
                  <Avatar.Icon
                    {...props}
                    icon="shield-half-full"
                    style={[styles.icon, {backgroundColor: colors.primary}]}
                  />
                )}
              />
            </TouchableOpacity>
          </Card>
          <Card theme={MD3LightTheme} style={{margin: 10, marginTop: 40}}>
            <TouchableOpacity onPress={handleLogout}>
              <Card.Title
                title="Đăng xuất"
                left={props => (
                  <Avatar.Icon
                    {...props}
                    icon="logout"
                    style={[styles.icon, {backgroundColor: colors.danger}]}
                  />
                )}
              />
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingScreen;
