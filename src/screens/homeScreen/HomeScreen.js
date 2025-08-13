import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import styles from './HomeScreen.style';
import {useEffect, useState} from 'react';
import DefaultButton from '../../components/buttons/DefaultButton';
import colors from '../../constants/colors';
import {postData} from '../../services/requestDefaultAPI';
import moment from 'moment';
// import signalr from 'react-native-signalr';
import 'text-encoding';
import DefaultText from '../../components/texts/DefaultText';
import {useLoading} from '../../providers/LoadingProvider';
import DateTimeInput from '../../components/inputs/DateTimeInput';
import {Dropdown} from 'react-native-paper-dropdown';
import SuccessModal from '../../components/modals/SuccessModal';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setOpenModal} from '../../actions/dataAction';
import HeaderBar from '../../components/header/HeaderBar';

const sessions = [
  {label: 'Sáng', value: 'SA'},
  {label: 'Chiều', value: 'CH'},
];

const currentHour = new Date().getHours();

const HomeScreen = ({route}) => {
  const {agency, boPhanID} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const successData = useSelector(state => state.dataReducer.successData);
  const reloadData = useSelector(state => state.dataReducer.reloadData);
  const openModal = useSelector(state => state.dataReducer.openModal);
  const {width, height} = useWindowDimensions();
  const {showLoading, hideLoading} = useLoading();
  const [numbers, setNumbers] = useState([]);
  const [numberSelect, setNumberSelect] = useState(0);
  const [registerDate, setRegisterDate] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedSession, setSelectedSession] = useState(
    currentHour < 12 ? 'SA' : 'CH',
  );

  const registerData = () => {
    if (numberSelect !== 0) {
      navigation.navigate('ConfirmScreen', {
        selectedItem: selectedItem,
        session: selectedSession,
        registerDate: registerDate.toISOString(),
        agency: agency,
        boPhanID: boPhanID,
      });
    } else {
      Alert.alert('Vui lòng chọn số!');
    }
  };

  // useEffect(() => {
  //   const connection = signalr.hubConnection(
  //     'http://nhatrangtructuyen.cenit.vn',
  //   );
  //   connection.logging = true;

  //   const proxy = connection.createHubProxy('notifyHub');
  //   //receives broadcast messages from a hub function, called "helloApp"
  //   proxy.on('notifyMess', async (type, model) => {
  //     console.log('session: ' + session);
  //     await reloadNumbers(type, model);
  //     //Here I could response by calling something else on the server...
  //   });

  //   // atempt connection, and handle errors
  //   connection
  //     .start()
  //     .done(() => {
  //       console.log('Now connected, connection ID=' + connection.id);

  //       proxy
  //         .invoke('helloServer', 'Hello Server, how are you?')
  //         .done(directResponse => {
  //           console.log('direct-response-from-server', directResponse);
  //         })
  //         .fail(() => {
  //           console.warn(
  //             'Something went wrong when calling server, it might not be up and running?',
  //           );
  //         });
  //     })
  //     .fail(() => {
  //       console.log('Failed');
  //     });
  // }, []);

  const reloadNumbers = async (type, model) => {
    if (type === 'mobile') {
      if (response.Status === 200) {
        setNumbers(response.Data);
      }
      if (model.NumbericOrderId === numberSelect) {
        setNumberSelect(0);
      }
    }
  };

  const getNumberOrder = async () => {
    showLoading();
    const response = await postData('/api/BocSoVer2/DanhSachSoByLinhVuc', {
      Buoi: selectedSession,
      LinhVuc_ID: agency?.LinhVuc_ID,
      NgayDangKy: registerDate,
    });
    hideLoading();

    if (response.Status === 200) {
      const now = new Date();
      const filteredData = response.Data.filter(item => {
        const startTime = new Date(item.BatDau);
        return startTime > now;
      });
      setNumbers(filteredData);
    }
  };

  useEffect(() => {
    if (agency) {
      getNumberOrder();
      setNumberSelect(0);
    }
  }, [agency, registerDate, selectedSession, reloadData]);

  const checkTime = item => {
    setSelectedItem(item);
    const {BatDau, SoPhieu} = item;
    const currentTime = new Date();
    const startTime = new Date(BatDau);

    if (startTime < currentTime) {
      Alert.alert(
        'Chọn số thất bại',
        'Vui lòng chọn số thứ tự có thời gian bắt đầu lớn hơn thời gian hiện tại',
      );
    } else {
      setNumberSelect(SoPhieu);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="CHỌN SỐ" />
      <ScrollView>
        <View style={styles.content}>
          <DefaultText fontSize={16} text="Bước 2: Chọn số" />
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <DefaultText
              text="Thời gian"
              fontSize={16}
              style={{paddingTop: 5}}
            />
            <DateTimeInput
              placeholder="DD/MM/YYYY"
              value={registerDate}
              onChange={setRegisterDate}
              mode="date"
              width={130}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                height: 50,
                borderColor: colors.secondary,
              }}
            />
            <Dropdown
              mode="outlined"
              label="Buổi"
              options={sessions}
              value={selectedSession}
              onSelect={value => {
                if (value) {
                  setSelectedSession(value);
                }
              }}
            />
          </View>
          <View style={styles.numberSelectListContainer}>
            {numbers.length > 0 ? (
              numbers.map(item => (
                <View style={styles.numberSelectItem} key={item.SoPhieu}>
                  <TouchableOpacity
                    style={[
                      styles.numberSelectItemBtn,
                      {
                        backgroundColor: colors.white,
                        borderWidth: item.SoPhieu === numberSelect ? 3 : 1.5,
                        borderColor:
                          item.SoPhieu === numberSelect
                            ? colors.primary
                            : colors.black,
                      },
                    ]}
                    onPress={() => {
                      if (item.TrangThaiXuLy === 0) {
                        checkTime(item);
                      }
                    }}>
                    <View
                      style={[
                        styles.numberSelectItemBtnCont,
                        {
                          backgroundColor:
                            item.TrangThaiXuLy === 0
                              ? colors.success
                              : item.TrangThaiXuLy === 2
                              ? colors.warning
                              : colors.pink,
                        },
                      ]}>
                      <Text style={styles.numberSelectItemText}>
                        {item.SoPhieu}
                      </Text>
                    </View>
                    <View style={[styles.numberSelectItemBtnTime]}>
                      <Text>
                        <Text
                          style={[
                            styles.numberSelectItemTime,
                            {
                              fontWeight: 'bold',
                              fontSize: 12,
                            },
                          ]}>
                          {moment(item.BatDau).format('HH:mm')}
                        </Text>
                        <Text style={styles.numberSelectItemTime}>~</Text>
                        <Text style={styles.numberSelectItemTime}>
                          {moment(item.KetThuc).format('HH:mm')}
                        </Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  color: colors.black,
                  padding: 5,
                  flex: 1,
                }}>
                Không có phiếu
              </Text>
            )}
          </View>
          <View style={styles.containerGroup}>
            <View style={styles.noteItemCont}>
              <View
                style={[
                  styles.noteItem,
                  {
                    backgroundColor: colors.warning,
                  },
                ]}
              />
              <DefaultText text="Đang thực hiện" fontSize={12} />
            </View>
            <View style={[styles.noteItemCont]}>
              <View
                style={[
                  styles.noteItem,
                  {
                    backgroundColor: colors.success,
                  },
                ]}
              />
              <DefaultText text="Có thể đặt" fontSize={12} />
            </View>
            <View style={styles.noteItemCont}>
              <View
                style={[
                  styles.noteItem,
                  {
                    backgroundColor: colors.pink,
                  },
                ]}
              />
              <DefaultText text="Không được đặt" fontSize={12} />
            </View>
          </View>
          <DefaultButton
            title={'Đăng ký'}
            style={styles.submitButton}
            height={60}
            width={width - 20}
            onPress={registerData}
            type="success"
            titleStyle={{
              fontSize: 20,
              fontWeight: 'bold',
            }}
          />
        </View>
      </ScrollView>
      <SuccessModal
        isVisible={openModal}
        onClose={() => dispatch(setOpenModal(false))}
        data={successData}
        minute={successData?.Minute || '30'}
      />
    </View>
  );
};

export default HomeScreen;
