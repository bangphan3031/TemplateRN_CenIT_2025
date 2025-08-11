import {store} from '../store/store';
import {realm} from './StorageServices';

// file này chứa các hàm thêm nhiều dữ liệu, lấy nhãn bằng key của table LabelLanguage

// lấy label bằng key
const getLabelByKey = key => {
  const locale = store.getState().localeReducer.locale;

  const label = realm
    .objects('LabelLanguage')
    .filtered(`Language_Code = '${locale}' and KeyLabel = '${key}'`)[0];

  if (label && label.isValid()) {
    return label.ValueLabel;
  }

  return '';
};

// thêm nhiều label ngôn ngữ
const addMultiLabelLanguages = (list = []) => {
  // lấy danh sách Label Language
  const datas = realm.objects('LabelLanguage');

  return new Promise(resolve => {
    realm.write(() => {
      realm.delete(datas);
      // lặp từng dữ liệu trong danh sách được thêm vào bảng
      list.forEach(item => {
        realm.create('LabelLanguage', item);
      });
      resolve(datas);
    });
  });
};

export {addMultiLabelLanguages, getLabelByKey};
