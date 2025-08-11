import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import DefaultText from '../texts/DefaultText';

const {width, height} = Dimensions.get('window');

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',
};

const Timeline = ({type, labels, data}) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const nextStep = () => {
    setCurrentPosition(currentPosition + 1);
  };

  return (
    <View style={styles.indicatorContainer}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        labels={labels}
        direction={type}
        renderLabel={({position, stepStatus, label, crntPosition}) => {
          const eventData = data[position];
          if (eventData) {
            return (
              <View style={styles.lplContainer}>
                <DefaultText
                  style={styles.lplContainer}
                  text={eventData.title}
                  fontSize={20}
                  fontWeight="bold"
                />
                <DefaultText
                  style={styles.lplText}
                  text={eventData.description}
                />
                <DefaultText style={styles.lplText} text={eventData.date} />
              </View>
            );
          } else {
            return null; // Trả về null nếu không có dữ liệu tương ứng
          }
        }}
      />
      <TouchableOpacity style={styles.nextBtn} onPress={() => nextStep()}>
        <DefaultText style={styles.text} text={'Next'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    height: height - 200,
    width: width - 30,
    padding: 20,
    paddingTop: 0,
  },
  lplContainer: {
    marginTop: 22,
    paddingLeft: 5,
    width: width - 100,
  },
  lplText: {
    paddingLeft: 5,
  },
  nextBtn: {
    alignSelf: 'flex-end',
  },
  text: {
    color: '#ff3232',
  },
});

export default Timeline;
