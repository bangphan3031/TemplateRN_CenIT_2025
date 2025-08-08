import { View, FlatList, StyleSheet } from 'react-native';
import styles from './InfoScreen.style';
import DefaultButton from '../../components/buttons/DefaultButton';
import { useTranslation } from 'react-i18next';
import DefaultText from '../../components/texts/DefaultText';

const InfoScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <DefaultText text={t('Info screen')} />
    </View>
  );
};

export default InfoScreen;
