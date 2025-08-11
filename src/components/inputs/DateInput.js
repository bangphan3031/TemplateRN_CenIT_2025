import { useCallback } from "react";
import { View } from "react-native"
import { DatePickerInput } from "react-native-paper-dates";
import { registerTranslation } from 'react-native-paper-dates'
registerTranslation('vn', {
  save: 'Lưu',
  selectSingle: 'Chọn ngày',
  previous: 'Lùi',
  next: 'Tiếp',
  typeInDate: 'Type in date',
  close: 'Đóng',
})

const DatePicker = ({
    style,
    date, 
    setDate,
    label,
    inputMode = 'start',
    mode='outlined'
} = props) => {

    return (
        <View style={style}>
            <DatePickerInput
                locale="vn"
                label={label + "           "}
                value={date}
                onChange={(d) => setDate(d)}
                inputMode={inputMode}
                mode={mode}
            />
        </View>
    )
}

export default DatePicker