import {realm} from './StorageServices';

// file này chứa các hàm thêm nhiều dữ liệu vào table Language

// thêm nhiều ngôn ngữ
const addMultiLanguages = (list = []) => {
  // lấy danh sách Language
  const datas = realm.objects('Language');

  return new Promise(resolve => {
    realm.write(() => {
      // lặp từng dữ liệu trong danh sách được thêm vào bảng
      list.forEach(item => {
        // kiểm tra đã tồn tại Language này chưa
        const isExist = realm
          .objects('Language')
          .filtered(`Language_Code = '${item.Language_Code}'`)[0]
          ? true
          : false;

        // chưa tồn tại thì thêm vào
        if (!isExist) {
          realm.create('Language', item);
        }
      });
      resolve(datas);
    });
  });
};

export {addMultiLanguages};
