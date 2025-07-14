import colors from '@/constants/Colors';
import { globalStyles } from '@/constants/Styles';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BalanceCard from './ui/BalanceCard';
import Selection from './ui/Selection';
import TransactionTypeSelector from './ui/TransactionTypeSelector';


export default function HeaderComponent() {
  const [selectedMonth, setSelectedMonth] = useState('may-2024');

  return (
    <View style={styles.root}>
      <View style={[globalStyles.container]}>
        {/* Navbar */}
        <View style={styles.nav}>
          <Text style={styles.brand}>PayBook</Text>
          
          <Selection 
            value={selectedMonth} 
            onValueChange={setSelectedMonth} 
          />
        </View>

        {/* Balance card */}
        <BalanceCard />
        
        {/* Transaction type selector */}
        <View style={styles.transactionTypeSelectorBox}>
          <TransactionTypeSelector />
        </View>
      </View>
    </View>
  );
}

// Stylar o'zgarishsiz qoldi...

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.primary,
    paddingTop: 50,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 1,
  },
  brand: {
    fontSize: 25,
    color: colors.white,
    fontWeight: '500',
    fontFamily: 'JetBrainsMono-Bold',
  },
  transactionTypeSelectorBox: {
    marginTop: 28,
  },
});