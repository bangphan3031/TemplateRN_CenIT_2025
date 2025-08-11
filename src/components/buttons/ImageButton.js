import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import DefaultText from '../texts/DefaultText';
import {SvgUri} from 'react-native-svg';
import {API_BASE_URL} from '../../constants/api';

const ImageButton = ({
  onPress,
  backgroundColor,
  imageSrc,
  text,
  textColor,
  style,
} = props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style,
        {
          backgroundColor: backgroundColor,
        },
      ]}>
      <SvgUri
        style={styles.image}
        uri={`${API_BASE_URL}${imageSrc}`}
        width={25}
        height={25}
      />
      <DefaultText
        text={text}
        style={[
          styles.text,
          {
            color: textColor,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

export default ImageButton;

const styles = StyleSheet.create({
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
