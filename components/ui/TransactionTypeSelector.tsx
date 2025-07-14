import colors from '@/constants/Colors';
import { useTransaction } from '@/context/TransactionContext';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TransactionTypeSelector() {
  const { transactionType: currentType, setTransactionType: onTypeChange } = useTransaction();
  
  const types = [
    { id: 'income', label: 'Kirim' },
    { id: 'expense', label: 'Chiqim' },
    { id: 'loan', label: 'Qarz' },
  ] as const;

  return (
    <View style={styles.container}>
      {types.map((type) => (
        <TouchableOpacity
          key={type.id}
          style={[
            styles.button,
            currentType === type.id && styles.activeButton
          ]}
          onPress={() => onTypeChange(type.id)}
        >
          <Text style={[
            styles.buttonText,
            currentType === type.id && styles.activeText
          ]}>
            {type.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// Stylar o'zgarishsiz qoldi...

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 30,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: colors.dark,
  },
  buttonText: {
    fontSize: 16,
    color: colors.dark,
    fontWeight: '500',
    fontFamily: 'JetBrainsMono-Bold',
  },
  activeText: {
    color: colors.white,
  },
});