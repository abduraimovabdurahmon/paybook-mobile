import colors from '@/constants/Colors';
import { globalStyles } from '@/constants/Styles';
import { useApp } from '@/context/AppContext';
import { useTransaction } from '@/context/TransactionContext';
import { useEffect, useRef } from 'react';
import { Animated, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import BalanceCard from './ui/BalanceCard';
import Selection from './ui/Selection';
import TransactionTypeSelector from './ui/TransactionTypeSelector';

export default function HeaderComponent({ page }: { page: string }) {
  const { homeRefreshing, setHomeRefreshing } = useApp();
  const { selectedMonth, setSelectedMonth, months, refreshSignal } = useTransaction();

  // Animation setup
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (refreshSignal) {
      // Start looping animation for color and scale
      Animated.loop(
        Animated.timing(animValue, {
          toValue: 1,
          duration: 2000, // Smooth cycle for both color and scale
          useNativeDriver: false, // Use JS driver for all animations
        })
      ).start();
    } else {
      // Stop animation and reset to initial state
      animValue.setValue(0);
      Animated.loop(Animated.timing(animValue, { toValue: 0, duration: 0, useNativeDriver: false })).stop();
    }
    // Cleanup on unmount
    return () => {
      animValue.stopAnimation();
    };
  }, [refreshSignal]);

  // Interpolate colors for the two 'o' letters
  const leftOColor = animValue.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: [colors.red || '#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#0000FF', colors.red || '#FF0000'],
  });

  const rightOColor = animValue.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: ['#0000FF', colors.red || '#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#0000FF'],
  });

  // Interpolate scales for alternating pulsing effect
  const leftOScale = animValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.5, 1], // Left 'o' scales up at 0.5
  });

  const rightOScale = animValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1.5, 1, 1.5], // Right 'o' scales down at 0.5
  });

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleRefresh = async () => {
    if (page === "home") {
      setHomeRefreshing(true);
      await sleep(2000);
      setHomeRefreshing(false);
    } else {
      alert("Bu statistics sahifasi, bunda refresh qila olmaysiz!");
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={homeRefreshing}
            onRefresh={() => handleRefresh()}
            colors={[colors.primary]}
            progressBackgroundColor={colors.background}
          />
        }
      >
        <View style={[globalStyles.container]}>
          {/* Navbar */}
          <View style={styles.nav}>
            <View style={styles.brandContainer}>
              {refreshSignal ? (
                <>
                  <Text style={[styles.brand, { color: colors.white }]}>PayB</Text>
                  <Animated.Text
                    style={[
                      styles.brand,
                      { color: leftOColor, transform: [{ scale: leftOScale }] },
                    ]}
                  >
                    o
                  </Animated.Text>
                  <Animated.Text
                    style={[
                      styles.brand,
                      { color: rightOColor, transform: [{ scale: rightOScale }] },
                    ]}
                  >
                    o
                  </Animated.Text>
                  <Text style={[styles.brand, { color: colors.white }]}>k</Text>
                </>
              ) : (
                <Text style={styles.brand}>PayBook</Text>
              )}
            </View>
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
  brandContainer: {
    flexDirection: 'row',
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