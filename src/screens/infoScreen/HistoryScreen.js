import {View, FlatList} from 'react-native';
import styles from './HistoryScreen.style';
import {useEffect, useState} from 'react';
import {useLoading} from '../../providers/LoadingProvider';
import {getData, postData} from '../../services/requestDefaultAPI';
import {useSelector} from 'react-redux';
import {Dropdown} from 'react-native-paper-dropdown';
import DropdownSearch from '../../components/dropdown/DropDownSearch';
import DateTimeInput from '../../components/inputs/DateTimeInput';
import DefaultButton from '../../components/buttons/DefaultButton';
import HistoryCard from '../../components/cards/HistoryCard';
import colors from '../../constants/colors';
import HeaderBar from '../../components/header/HeaderBar';

const HistoryScreen = () => {
  const {showLoading, hideLoading} = useLoading();
  const user = useSelector(state => state.userReducer.user);
  const wardIdFromRedux = useSelector(state => state.agencyReducer.wardId);
  const [historyData, setHistoryData] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [agencies, setAgencies] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState('');
  const [totalRow, setTotalRow] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [wards, setWards] = useState([]);
  const [selectedWardId, setSelectedWardId] = useState();

  const getHistoryData = async newPageIndex => {
    showLoading();
    const response = await postData('/api/BocSo/LichSuDatSo', {
      SoCCCD: user.cccd,
      LinhVuc_ID: selectedAgency || null,
      TuNgay: startDate || null,
      DenNgay: endDate || null,
      PageSize: 10,
      PageIndex: newPageIndex,
    });
    hideLoading();
    if (response.Status === 200) {
      const newData = response.Data.data;
      console.log('History Data:', newData);
      if (newData != null && newPageIndex > 0) {
        setHistoryData(
          historyData ? [...historyData, ...newData] : [...newData],
        );
      } else {
        setHistoryData(newData);
      }
      setTotalRow(response.Data.RowNumber);
    }
  };

  const handleSearch = () => {
    setPageIndex(0);
    getHistoryData(0);
  };

  //Call api hiển thị danh sách xã, phường
  useEffect(() => {
    const getWards = async () => {
      const response = await getData('/api/BocSoVer2/DanhSachBPMC', {});
      if (response.Status === 200) {
        const wardList = response.Data.map(ward => ({
          label: ward.TenBoPhan,
          value: ward.BoPhanID,
        }));
        setWards(wardList);
      }
    };
    getWards();
  }, []);

  // Sử dụng wardId từ Redux nếu có
  useEffect(() => {
    if (wardIdFromRedux) {
      setSelectedWardId(wardIdFromRedux);
      getAgencies(wardIdFromRedux);
    }
  }, [wardIdFromRedux]);


  // useEffect(() => {
  //   const getAgencies = async () => {
  //     showLoading();
  //     const response = await postData('/api/BocSo/DanhSachLinhVuc', {});

  //     if (response.Status === 200) {
  //       const agencyList = response.Data.map(agency => ({
  //         label: agency.TenLinhVuc,
  //         value: agency.LinhVuc_ID,
  //       }));
  //       setAgencies(agencyList);
  //       hideLoading();
  //     }
  //   };
  //   getAgencies();
  // }, []);

  const loadMore = async () => {
    if (isLoadMore && historyData.length < totalRow) {
      setPageIndex(prev => prev + 10);
      await getHistoryData(pageIndex + 10);
      setIsLoadMore(false);
    }
  };

  const getAgencies = async (id) => {
    try {
      showLoading();
      const response = await postData(`/api/BocSoVer2/DanhSachLinhVuc?BoPhanID=${id}`, {});

      if (response.Status === 200) {
        const agencyList = response.Data.map(agency => ({
          label: agency.TenLinhVuc,
          value: agency.LinhVuc_ID,
        }));
        setAgencies(agencyList);
        hideLoading();
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách lĩnh vực:', error);
    } finally {
      hideLoading();
    }
  };
  const handleSelectWard = (value) => {
    console.log('Xã/Phường được chọn:', value);
    getAgencies(value);
    setSelectedWardId(value);
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="LỊCH SỬ ĐẶT SỐ" />
      <View style={{paddingHorizontal: 10}}>
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
        </View>
        <View style={styles.dropdownContainer}>
          <Dropdown
            mode="outlined"
            label="Lĩnh vực"
            placeholder="Chọn lĩnh vực"
            options={agencies}
            value={selectedAgency}
            onSelect={setSelectedAgency}
          />
        </View>
        <View style={styles.row}>
          <DateTimeInput
            label="Từ ngày"
            placeholder="DD/MM/YYYY"
            value={startDate}
            onChange={setStartDate}
            mode="date"
            width={150}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: colors.secondary,
            }}
          />
          <DateTimeInput
            label="Đến ngày"
            placeholder="DD/MM/YYYY"
            value={endDate}
            onChange={setEndDate}
            mode="date"
            width={150}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: colors.secondary,
            }}
          />
        </View>
        <DefaultButton
          title={'Tìm kiếm'}
          height={50}
          onPress={handleSearch}
          type="primary"
          leftIcon="magnify"
          style={{borderRadius: 5}}
          titleStyle={{
            fontSize: 16,
          }}
        />
        {historyData && (
          <View style={{marginTop: 10, marginBottom: 545}}>
            <FlatList
              data={historyData}
              // onRefresh={reloadList}
              // refreshing={isReloadList}
              keyExtractor={(item, i) => i}
              style={styles.cardList}
              onEndReached={loadMore}
              onMomentumScrollBegin={() => setIsLoadMore(true)}
              renderItem={({item, index}) => (
                <HistoryCard
                  Phieu_ID={item.Phieu_ID}
                  SoPhieu={item.SoPhieu}
                  TenLinhVuc={item.TenLinhVuc}
                  NgayThucHien={item.NgayThucHien}
                  MaXacNhan={item.MaXacNhan}
                  Buoi={item.Buoi}
                  TenBoPhan={item.TenBoPhan}
                  TrangThaiXuLy={item.TrangThaiXuLy}
                />
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default HistoryScreen;
