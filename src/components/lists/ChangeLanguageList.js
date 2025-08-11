import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import DefaultText from '../texts/DefaultText';
import {useTranslation} from 'react-i18next';
import colors from '../../constants/colors';
import {getDatas, removeAllData} from '../../realm/StorageServices';
import ImageButton from '../buttons/ImageButton';
import {useDispatch, useSelector} from 'react-redux';
import {setLocale} from '../../actions/localeAction';
import {addMultiLanguages} from '../../realm/LanguageStorageServices';
import {
  addMultiLabelLanguages,
  getLabelByKey,
} from '../../realm/LabelLanguageStorageServices';
import useLocaleLabel from '../../hooks/useLocaleLabel';
import {getData} from '../../services/requestDefaultAPI';
import {
  API_GET_LABELS_LANGUAGE_BY_CODE,
  API_GET_LANGUAGES,
} from '../../constants/api';
import Loading from '../loadings/Loading';

const languagesSample = [
  {
    Language_Code: 'vie',
    Language_Title: 'Tiếng việt',
    Language_Avatar:
      'https://hdvdulich.cenit.vn/Contents/imgs/nation/language/language_vi.svg',
  },
  {
    Language_Code: 'eng',
    Language_Title: 'English',
    Language_Avatar:
      'http://hdvdulich.cenit.vn/Contents/imgs/nation/language/language_en.svg',
  },
];

const lableLanguagesSample = [
  {
    Label_ID: 1,
    Language_Code: 'vie',
    KeyLabel: 'LoginTitle',
    ValueLabel: 'Đăng nhập',
  },
  {
    Label_ID: 2,
    Language_Code: 'eng',
    KeyLabel: 'LoginTitle',
    ValueLabel: 'Login',
  },
  {
    Label_ID: 3,
    Language_Code: 'vie',
    KeyLabel: 'BottomTab.Home',
    ValueLabel: 'Trang chủ',
  },
  {
    Label_ID: 4,
    Language_Code: 'eng',
    KeyLabel: 'BottomTab.Home',
    ValueLabel: 'Home',
  },
  {
    Label_ID: 5,
    Language_Code: 'vie',
    KeyLabel: 'BottomTab.Info',
    ValueLabel: 'Thông tin',
  },
  {
    Label_ID: 6,
    Language_Code: 'eng',
    KeyLabel: 'BottomTab.Info',
    ValueLabel: 'Info',
  },
  {
    Label_ID: 7,
    Language_Code: 'vie',
    KeyLabel: 'BottomTab.Setting',
    ValueLabel: 'Cài đặt',
  },
  {
    Label_ID: 8,
    Language_Code: 'eng',
    KeyLabel: 'BottomTab.Setting',
    ValueLabel: 'Setting',
  },
];

const ChangeLanguageList = () => {
  const dispatch = useDispatch();
  const locale = useSelector(state => state.localeReducer.locale);
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getValueByKeyAndLocale = useLocaleLabel();

  // cập nhật lại ngôn ngữ của app khi thay đổi ngôn ngữ
  const changeLanguage = async key => {
    try {
      const response = await getData(API_GET_LABELS_LANGUAGE_BY_CODE, {
        LangCode: key,
      });

      if (response.Status === 200) {
        const labelLanguages = await addMultiLabelLanguages(response.Data);
        dispatch(setLocale(key));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // lấy danh sách ngôn ngữ
    const getLanguages = async () => {
      try {
        setIsLoading(true);
        const response = await getData(API_GET_LANGUAGES);
        console.log(response);
        if (response.Status === 200) {
          const listOfLanguages = await addMultiLanguages(response.Data);

          setLanguages(listOfLanguages);
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    getLanguages();
  }, []);

  const addData = async isDelete => {
    if (isDelete) {
      const res = await removeAllData('Language');
    } else {
      const res = await addMultiLanguages(languagesSample);
    }
  };

  return (
    <View>
      <Loading isLoading={isLoading} style={styles.container}>
        {languages.map(language => (
          <ImageButton
            key={language.Language_Code}
            onPress={() => changeLanguage(language.Language_Code)}
            imageSrc={language.Language_Avatar}
            text={language.Language_Title}
            textColor={
              locale === language.Language_Code ? colors.white : colors.black
            }
            backgroundColor={
              locale === language.Language_Code ? colors.primary : colors.white
            }
            style={styles.button}
          />
        ))}
        {/* <Button onPress={() => addData(true)}>ADD</Button> */}
        <DefaultText text={getValueByKeyAndLocale('P_Login_Button_SignIn')} />
      </Loading>
    </View>
  );
};

export default ChangeLanguageList;

const styles = StyleSheet.create({
  container: {
    gap: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    borderColor: colors.primary,
    borderRadius: 6,
    width: 290,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 2,
    padding: 12,
  },
  image: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    overflow: 'hidden',
  },
  text: {
    marginLeft: 22,
  },
});
