import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {getLabelByKey} from '../realm/LabelLanguageStorageServices';

// hooks này có chức năng trả ra label từ key và locale, khi locale thay đổi thì lable sẽ thay đổi theo locale
const useLocaleLabel = () => {
  // lấy locale được lưu trên store
  const locale = useSelector(state => state.localeReducer.locale);

  // Hàm trả về giá trị dựa trên key và locale
  const getValueByKeyAndLocale = key => {
    // Thực hiện logic để lấy giá trị dựa trên key và locale từ store
    const value = getLabelByKey(key);

    return value;
  };

  // Sử dụng useMemo để tái sử dụng hàm khi locale thay đổi
  return useMemo(() => getValueByKeyAndLocale, [locale]);
};

export default useLocaleLabel;
