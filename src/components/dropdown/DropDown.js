import { View } from 'react-native';
import { Dropdown as DropdownPaper, MultiSelectDropdown } from 'react-native-paper-dropdown';

const DropDown = ({
    label,
    placeholder,
    options,
    value,
    onSelect,
    style,
    isMulti,
    mode = 'outlined'
} = props ) => {
    return (
        <View style={style}>
            {isMulti ? <MultiSelectDropdown
                label={label}
                placeholder={placeholder}
                options={options}
                value={value}
                onSelect={onSelect}
                st={style}
                mode={mode}
              /> : <DropdownPaper
              label={label}
              placeholder={placeholder}
              options={options}
              value={value}
              onSelect={onSelect}
              mode={mode}
              />
            }
        </View>

    )
}

export default DropDown