import {ScrollView, View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import styles from './UserInfoScreen.style';
import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react';
import {Avatar, Icon} from 'react-native-paper';
import DefaultText from '../../components/texts/DefaultText';
import HeaderBar from '../../components/header/HeaderBar';
import DefaultButton from '../../components/buttons/DefaultButton';
import {updatePhone} from '../../actions/userAction';

const UserInfoScreen = () => {
  const user = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();
  const [avatarSource, setAvatarSource] = useState(
    require('../../assets/images/avatars/DefaultAvatar.jpg'),
  );
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');
  const [phoneError, setPhoneError] = useState('');

  const formatBirthday = birthday => {
    if (!birthday || birthday.length !== 8) return 'N/A';
    const day = birthday.substring(0, 2);
    const month = birthday.substring(2, 4);
    const year = birthday.substring(4, 8);
    return `${day}/${month}/${year}`;
  };

  const validatePhoneNumber = (phone) => {
    // Kiểm tra số điện thoại Việt Nam (10-11 số, bắt đầu bằng 0)
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8,9})$/;
    return phoneRegex.test(phone);
  };

  const handleEditPhone = () => {
    setPhoneNumber(user?.phone || '');
    setPhoneError('');
    setIsEditingPhone(true);
  };

  const handleCancelEdit = () => {
    setPhoneNumber(user?.phone || '');
    setPhoneError('');
    setIsEditingPhone(false);
  };

  const handleSavePhone = () => {
    if (!phoneNumber.trim()) {
      setPhoneError('Vui lòng nhập số điện thoại');
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError('Số điện thoại không hợp lệ');
      return;
    }
    
    dispatch(updatePhone(phoneNumber));
    setIsEditingPhone(false);
    setPhoneError('');
    Alert.alert('Thành công', 'Cập nhật số điện thoại thành công');
  };

  return (
    <>
      <View style={styles.container}>
        <HeaderBar title="THÔNG TIN CÁ NHÂN" />
        <ScrollView contentContainerStyle={styles.content}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Avatar.Image size={100} source={avatarSource} />
            <DefaultText
              text={user?.name}
              fontSize={20}
              fontWeight={700}
              style={{marginTop: 10}}
            />
          </View>
          {/* Thông tin user */}
          <View style={styles.userInfoContainer}>
            <DefaultText text="CCCD" fontSize={12} />
            <DefaultText
              text={user?.cccd}
              fontWeight={700}
              fontSize={16}
              style={{marginBottom: 10}}
            />

            <DefaultText text="Ngày Sinh" fontSize={12} />
            <DefaultText
              text={formatBirthday(user.birthday)}
              fontWeight={700}
              fontSize={16}
              style={{marginBottom: 10}}
            />

            <DefaultText text="Giới Tính" fontSize={12} />
            <DefaultText
              text={user?.gender}
              fontWeight={700}
              style={{marginBottom: 10}}
            />

            <DefaultText text="Địa Chỉ" fontSize={12} />
            <DefaultText text={user?.address} fontSize={16} fontWeight={700} style={{marginBottom: 10}} />

            {/* Số điện thoại */}
            <View style={styles.phoneContainer}>
              <View style={styles.phoneInfoContainer}>
                <DefaultText text="Số Điện Thoại" fontSize={12} />
                {!isEditingPhone ? (
                  <View style={styles.phoneDisplayContainer}>
                    <DefaultText 
                      text={user?.phone || 'Chưa có số điện thoại'} 
                      fontSize={16} 
                      fontWeight={700}
                      style={{color: user?.phone ? '#000' : '#999'}}
                    />
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={handleEditPhone}>
                      <Icon source="pencil" size={20} color="#007BFF" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.editPhoneContainer}>
                    <View style={styles.phoneInputRow}>
                      <TextInput
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        placeholder="Nhập số điện thoại"
                        keyboardType="phone-pad"
                        style={styles.phoneInput}
                        placeholderTextColor="#999"
                      />
                      <View style={styles.editActionsContainer}>
                        <TouchableOpacity
                          style={styles.cancelButton}
                          onPress={handleCancelEdit}>
                          <Icon source="close" size={18} color="#ff0021" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.saveButton}
                          onPress={handleSavePhone}>
                          <Icon source="check" size={18} color="#5cdb5c" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {phoneError ? (
                      <Text style={styles.phoneErrorText}>{phoneError}</Text>
                    ) : null}
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default UserInfoScreen;
