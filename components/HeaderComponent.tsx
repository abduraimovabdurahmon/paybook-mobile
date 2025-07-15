import colors from '@/constants/Colors';
import { globalStyles } from '@/constants/Styles';
import { useApp } from '@/context/AppContext';
import { useTransaction } from '@/context/TransactionContext';
import api from '@/services/api';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import BalanceCard from './ui/BalanceCard';
import Selection from './ui/Selection';
import TransactionTypeSelector from './ui/TransactionTypeSelector';

export default function HeaderComponent() {
  interface Months {
    label: string;
    value: string;
  }

  const [months, setMonths] = useState<Months[]>([]);
  const {refreshing, setRefreshing} = useApp();
  const { selectedMonth, setSelectedMonth } = useTransaction();

  const fetchData = async () => {
    try {
      const response = await api.get('/api/transactions/months');
      console.log('Fetched months:', response.data);
      setMonths(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      console.log('Data fetching completed');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleRefresh = async () => {
    setRefreshing(true);
    await sleep(2000);
    setRefreshing(false);
  }

  useEffect(() => {
    if (months.length > 0) {
      setSelectedMonth(months[months.length - 1].value);
    }
  }, [months]);

  return (
    <View style={styles.root}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => handleRefresh()}
            colors={[colors.primary]}
            progressBackgroundColor={colors.background}
          />
        }
      >
        <View style={[globalStyles.container]}>
          {/* Navbar */}
          <View style={styles.nav}>
            <Text style={styles.brand}>PayBook</Text>
            <Selection
              value={selectedMonth}
              months={months}
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
      </ScrollView>
    </View>
  );
}

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