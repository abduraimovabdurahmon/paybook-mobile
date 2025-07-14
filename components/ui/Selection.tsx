import colors from '@/constants/Colors';
import { Platform, StyleSheet, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const months = [
  { label: 'Yanvar 2024', value: 'jan-2024' },
  { label: 'Fevral 2024', value: 'feb-2024' },
  { label: 'Mart 2024', value: 'mar-2024' },
  { label: 'Aprel 2024', value: 'apr-2024' },
  { label: 'May 2024', value: 'may-2024' },
  { label: 'Iyun 2024', value: 'jun-2024' },
];

interface SelectionProps {
  onValueChange: (value: string) => void;
  value: string;
}

const Selection = ({ onValueChange, value }: SelectionProps) => {
  return (
    <RNPickerSelect
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
});

export default Selection;