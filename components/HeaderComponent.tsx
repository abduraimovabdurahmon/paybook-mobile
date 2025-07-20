import colors from '@/constants/Colors';
import { globalStyles } from '@/constants/Styles';
import { useApp } from '@/context/AppContext';
import { useTransaction } from '@/context/TransactionContext';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import BalanceCard from './ui/BalanceCard';
import Selection from './ui/Selection';
import TransactionTypeSelector from './ui/TransactionTypeSelector';

export default function HeaderComponent({ page }: { page: string }) {
  const { homeRefreshing, setHomeRefreshing } = useApp();
  const { selectedMonth, setSelectedMonth, months } = useTransaction();

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
              <Text style={styles.brand}>PayBook</Text>
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