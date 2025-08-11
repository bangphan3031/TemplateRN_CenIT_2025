import { StyleSheet, Text, View } from "react-native"
import { RadioButton } from "react-native-paper"
import colors from "../../constants/colors"

const RadioInput = ({
    checked, 
    setChecked,
    values,
    style
} = props) => {
    return (
        <View style={style}>
          {values.map(i => (
            <View style={styles.radioCont} key={i.id}>
                <Text style={styles.radioLabel}>{i.label}</Text>
                <RadioButton
                    value={i.id}
                    key={i.id}
                    status={ checked === i.id ? 'checked' : 'unchecked' }
                    onPress={() => setChecked(i.id)}
                    color={colors.success}
                />
            </View>
          ))}
      </View>
    )
}

export default RadioInput

const styles = StyleSheet.create({
    radioCont: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioLabel: {
        color: colors.black,
        gap: 10,
        fontSize: 15
    }
})