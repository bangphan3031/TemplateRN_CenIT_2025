import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import CalendarPicker from 'react-native-calendar-picker';

const DatePicker = ({
  selectedStartDate,
  selectedEndDate,
  startFromMonday = true,
  allowRangeSelection,
  minDate,
  maxRangeDuration,
  onDateChange,
  todayBackgroundColor = 'rgba(0, 123, 255, 0.2)',
  selectedDayColor = colors.primary,
  selectedDayTextColor = '#fff',
} = props) => {
  return (
    <CalendarPicker
      selectedStartDate={selectedStartDate}
      selectedEndDate={selectedEndDate}
      startFromMonday={startFromMonday}
      allowRangeSelection={allowRangeSelection}
      minDate={minDate}
      maxRangeDuration={maxRangeDuration}
      onDateChange={onDateChange}
      previousTitle="Trước"
      nextTitle="Tiếp"
      selectMonthTitle="Chọn tháng"
      selectYearTitle="Chọn năm"
      todayBackgroundColor={todayBackgroundColor}
      selectedDayColor={selectedDayColor}
      selectedDayTextColor={selectedDayTextColor}
      weekdays={[
        'Thứ Hai',
        'Thứ Ba',
        'Thứ Tư',
        'Thứ Năm',
        'Thứ Sáu',
        'Thứ Bảy',
        'Chủ Nhật',
      ]}
      months={[
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ]}
    />
  );
};

export default DatePicker;

const styles = StyleSheet.create({});
