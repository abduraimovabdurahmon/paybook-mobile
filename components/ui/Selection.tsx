import colors from '@/constants/Colors';
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';



interface SelectionProps {
  onValueChange: (value: string) => void;
  value: string;
  months: Array<Months>
}

  interface Months {
    label: string;
    value: string;
  }

const Selection = ({ onValueChange, value, months }: SelectionProps) => {

  if (months.length === 0) {
    return <View style = {pickerSelectStyles.skeleton}>
      <ActivityIndicator color={"white"} style = {pickerSelectStyles.indicator}/>
    </View>;
  }

  return (
    <RNPickerSelect
      key={value}
      onValueChange={onValueChange}
      items={months}
      value={value}
      style={pickerSelectStyles}
      useNativeAndroidPickerStyle={false}
      placeholder={{}}
      Icon={() => {
        return <Text style={pickerSelectStyles.icon}>▼</Text>;
      }}
      fixAndroidTouchableBug={true}
    />
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: colors.white,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 56,
    paddingRight: 30,
  },
  inputAndroid: {
    color: colors.white,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 56,
    paddingRight: 30,
  },
  iconContainer: {
    top: Platform.OS === 'ios' ? 10 : 12,
    right: 12,
  },
  icon: {
    color: colors.white,
    fontSize: 12,
  },
  skeleton:{
    color: colors.white,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 56,
  },
  indicator: {
    paddingHorizontal: 40
  }
});

export default Selection;