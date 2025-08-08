import * as React from 'react';
import {Text, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const HelveticaNeueFont = {
  normal: 'helveticaneue',
  bold: 'helveticaneuebold',
  100: 'helveticaneuelight',
  200: 'helveticaneuelight',
  300: 'helveticaneuelight',
  400: 'helveticaneue',
  500: 'helveticaneue',
  600: 'helveticaneuebold',
  700: 'helveticaneuebold',
  800: 'helveticaneuebold',
  900: 'helveticaneuebold',
  normalitalic: 'helveticaneueitalic',
  bolditalic: 'helveticaneuebolditalic',
  '100italic': 'helveticaneuelightitalic',
  '200italic': 'helveticaneuelightitalic',
  '300italic': 'helveticaneuelightitalic',
  '400italic': 'helveticaneueitalic',
  '500italic': 'helveticaneueitalic',
  '600italic': 'helveticaneuebolditalic',
  '700italic': 'helveticaneuebolditalic',
  '800italic': 'helveticaneuebolditalic',
  '900italic': 'helveticaneuebolditalic',
};

const DefaultText = ({
  text,
  fontWeight = 500,
  fontSize = 14,
  isItalic = false,
  style,
} = props) => {
  return (
    <Text
      style={[
        {
          fontSize: fontSize,
          fontFamily: isItalic
            ? HelveticaNeueFont[fontWeight.toString() + 'italic']
            : HelveticaNeueFont[fontWeight.toString()],
          fontWeight: fontWeight,
          color: colors.black,
        },
        style,
      ]}>
      {text}
    </Text>
  );
};

export default DefaultText;
