import colors from '@/constants/Colors';
import { useApp } from '@/context/AppContext';
import { useTransaction } from '@/context/TransactionContext';
import api from '@/services/api';
import { getBalanceVisible, setBalanceVisible } from '@/services/storage';
import { beautySumm } from '@/utils/beautySumm';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BalanceCard() {
  const [showBalance, setShowBalance] = useState(false);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);  // Bu yerda isLoading e'lon qilindi

  const { selectedMonth } = useTransaction();
  const { refreshing, setRefreshing } = useApp();

  const fetchData = async () => {
    try {
      setIsLoading(true);  // Fetch boshlanishida loading true
      const balanceVisibility = await getBalanceVisible();
      setShowBalance(balanceVisibility === 'true');

      const response = await api.get('/api/transactions/balance', {
        params: { month: selectedMonth },
      });
      console.log('Fetched balance:', response.data.balance);
      setBalanceAmount(response.data.balance);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setIsLoading(false);  // Fetch tugagach loading false
    }
  };

  useEffect(() => {
    if (selectedMonth) {
      fetchData();
    }
  }, [selectedMonth]);

  useEffect(() => {
    if (refreshing) {
      fetchData();
    }
  }, [refreshing]);

  const toggleBalanceVisibility = async () => {
    const newVisibility = !showBalance;
    setShowBalance(newVisibility);
    try {
      await setBalanceVisible(newVisibility.toString());
    } catch (error) {
      console.error('Error saving balance visibility:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Umumiy balans</Text>
      </View>
      <View style={styles.balanceContainer}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Text style={styles.balanceText}>
              {showBalance ? beautySumm(balanceAmount) + " so'm" : '**************'}
            </Text>
            <TouchableOpacity style={styles.eyeButton} onPress={toggleBalanceVisibility}>
              <Ionicons
                name={showBalance ? 'eye-off' : 'eye'}
                size={24}
                color="#FFFFFF"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
        )}
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
    shadowOffset: { width: 0, height: 2 },
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
    color: '#fff',
    fontSize: 18,
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
