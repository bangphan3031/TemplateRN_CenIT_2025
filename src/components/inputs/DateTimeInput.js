import React, {useState} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import DatePicker from 'react-native-date-picker';
import DefaultInput from './DefaultInput'; // Import input component của bạn
import {useTranslation} from 'react-i18next';
import colors from '../../constants/colors';

const DateTimeInput = ({
  label,
  placeholder = 'DD/MM/YYYY',
  value,
  onChange,
  mode = 'date', // 'date', 'time', or 'datetime'
  locale = 'vi',
  width = 335,
  editable = false,
  style,
}) => {
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Input hiển thị */}

      <TouchableWithoutFeedback onPress={() => setOpen(true)}>
        <View pointerEvents="box-only">
          <DefaultInput
            value={value ? new Date(value).toLocaleDateString('en-GB') : ''}
            label={label || ''}
            placeholder={placeholder}
            width={width}
            editable={editable}
            pointerEvents="none"
            style={style}
          />
        </View>
      </TouchableWithoutFeedback>

      <DatePicker
        modal
        open={open}
        date={value ? new Date(value) : new Date()}
        mode={mode}
        locale={locale}
        onConfirm={date => {
          setOpen(false);
          onChange(date);
        }}
        onCancel={() => setOpen(false)}
        title="Chọn ngày"
        confirmText="Xác nhận"
        cancelText="Hủy bỏ"
      />
    </>
  );
};

export default DateTimeInput;
