import colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BalanceCard() {
  const [showBalance, setShowBalance] = useState(false);
  const balanceAmount = "1,234,567 so'm"; // Bu yerda haqiqiy balans qiymati bo'lishi kerak

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Umumiy balans</Text>
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>
          {showBalance ? balanceAmount : '**************'}
        </Text>
        <TouchableOpacity onPress={toggleBalanceVisibility} style={styles.eyeButton}>
          <Ionicons 
            name={showBalance ? 'eye-off' : 'eye'} 
            size={24} 
            color="#FFFFFF" 
            style={styles.eyeIcon} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    borderRadius: 30,
    padding: 24,
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'JetBrainsMono-Bold',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceText: {
    color: "#fff",
    fontSize: 22,
    letterSpacing: 1,
    flex: 1,
    fontWeight: '500',
    fontFamily: 'JetBrainsMono-Bold',
  },
  eyeButton: {
    padding: 8,
    marginLeft: 12,
  },
  eyeIcon: {
    opacity: 0.7,
  },
});