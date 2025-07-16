import colors from '@/constants/Colors';
import { useTransaction } from '@/context/TransactionContext';
import { getBalanceVisible, setBalanceVisible } from '@/services/storage';
import { beautySumm } from '@/utils/functions';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BalanceCard() {
  const [showBalance, setShowBalance] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { generalBalance } = useTransaction();
  const fadeAnim = useRef(new Animated.Value(0)).current; 

  const main = async () => {
    const balanceVisibility = await getBalanceVisible();
    setShowBalance(balanceVisibility === 'true');
  };

  useEffect(() => {
    main();

    setIsLoading(generalBalance === null);

    if (generalBalance ) {
      fadeAnim.setValue(0); 
      Animated.timing(fadeAnim, {
        toValue: 1, 
        duration: 500, 
        useNativeDriver: true,
      }).start();
    }
  }, [generalBalance]);

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
            <Animated.Text
              style={[
                styles.balanceText,
                { opacity: fadeAnim },
              ]}
            >
              {showBalance ? beautySumm(generalBalance) + " so'm" : '**************'}
            </Animated.Text>
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