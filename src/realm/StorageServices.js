import 'react-native-get-random-values';
import Realm from 'realm';
import InfoSchema from '../models/InfoModel';
import {store} from '../store/store';
import LabelLanguageSchema from '../models/LabelLanguageModel';
import LanguageSchema from '../models/LanguageModel';
import UserSchema from '../models/UserModel';

// file này chứa các hàm thêm, sửa, xóa dùng chung cho các table

const realm = new Realm({
  schema: [InfoSchema, LabelLanguageSchema, LanguageSchema, UserSchema],
  deleteRealmIfMigrationNeeded: true,
});

// thêm dữ liệu bằng vào bảng
const addData = (name, data) => {
  const datas = realm.objects(name);

  return new Promise(resolve => {
    realm.write(() => {
      realm.create(name, {
        id: new Realm.BSON.UUID().toString(),
        ...data,
      });

      resolve(datas);
    });
  });
};

// cập nhật dữ liệu bằng trong bảng
const updateData = (name, id, data) => {
  console.log(id);
  const datas = realm.objects(name);
  const dataToUpdate = realm.objects(name).filtered(`id = '${id}'`)[0];

  return new Promise(resolve => {
    realm.write(() => {
      if (dataToUpdate) {
        for (let key in data) {
          if (key in dataToUpdate) {
            dataToUpdate[key] = data[key];
          }
        }
      }

      resolve(datas);
    });
  });
};

// get danh sách dữ liệu bằng name của model
const getDatas = name => {
  const datas = realm.objects(name);
  return datas;
};

const getDataById = (name, id) => {
  const dataToUpdate = realm.objects(name).filtered(`id = '${id}'`)[0];

  return dataToUpdate;
};

// xóa giá trị ra khỏi bảng
const removeData = (name, data) => {
  const datas = realm.objects(name);

  return new Promise(resolve => {
    realm.write(() => {
      realm.delete(data);

      resolve(datas);
    });
  });
};

const removeAllData = name => {
  const datas = realm.objects(name);

  return new Promise(resolve => {
    realm.write(() => {
      realm.delete(datas);
      resolve(datas);
    });
  });
};

// đóng realm
const closeRealm = () => {
  realm.close();
};

export {
  realm,
  addData,
  getDatas,
  removeData,
  closeRealm,
  updateData,
  getDataById,
  removeAllData,
};
