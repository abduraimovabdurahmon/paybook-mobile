import HeaderComponent from "@/components/HeaderComponent";
import TransactionListView from "@/components/home/TransactionListView";
import colors from "@/constants/Colors";
import { useApp } from "@/context/AppContext";
import { useTransaction } from "@/context/TransactionContext";
import {
  fetchDebtBalance,
  fetchExpenseBalance,
  fetchGeneralBalance,
  fetchIncomeBalance,
  fetchIncomeTransactionsList,
  fetchMonths,
} from "@/services/transactions";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const {
    setRefreshSignal,
    generalBalance,
    setGeneralBalance,
    selectedMonth,
    setSelectedMonth,
    months,
    setMonths,
    incomeBalance,
    setIncomeBalance,
    expenseBalance,
    setExpenseBalance,
    debtBalance,
    setDebtBalance,
    incomeTransactions,
    setIncomeTransactions
  } = useTransaction();

  const { homeRefreshing } = useApp();

  const fetchAllBalances = async () => {
    try {
      const [general, income, expense, debt] = await Promise.all([
        fetchGeneralBalance({ selectedMonth }),
        fetchIncomeBalance({ selectedMonth }),
        fetchExpenseBalance({ selectedMonth }),
        fetchDebtBalance({ selectedMonth }),
      ]);

      setGeneralBalance(general);
      setIncomeBalance(income);
      setExpenseBalance(expense);
      setDebtBalance(debt);
    } catch (error) {
      console.error("Error fetching balances:", error);
    }
  };

  const fetchAllTransactions = async () => {
    try {
       const [income] = await Promise.all([
          fetchIncomeTransactionsList({selectedMonth})
       ]);

        setIncomeTransactions(income)
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch months on component mount
  useEffect(() => {
    const loadMonths = async () => {
      try {
        const monthsData = await fetchMonths();
        setMonths(monthsData);
      } catch (error) {
        console.error("Failed to load months:", error);
      }
    };
    loadMonths();
  }, []);

  // Set default selected month when months change
  useEffect(() => {
    if (months.length > 0) {
      setSelectedMonth(months[months.length - 1].value);
    }
  }, [months]);

  // Fetch all balances when selectedMonth changes

  useEffect(() => {
    if (selectedMonth) {
      fetchAllBalances();
      fetchAllTransactions();
    }
  }, [selectedMonth]);

  // Handle refresh
  useEffect(() => {
    if (homeRefreshing && selectedMonth) {
      const refreshBalances = async () => {
        try {
          // Reset balances
          setGeneralBalance(null);
          setIncomeBalance(null);
          setExpenseBalance(null);
          setDebtBalance({ totalBorrow: null, totalLend: null });

          // Fetch fresh balances
          const [general, income, expense, debt] = await Promise.all([
            fetchGeneralBalance({ selectedMonth }),
            fetchIncomeBalance({ selectedMonth }),
            fetchExpenseBalance({ selectedMonth }),
            fetchDebtBalance({ selectedMonth }),
          ]);

          setGeneralBalance(general);
          setIncomeBalance(income);
          setExpenseBalance(expense);
          setDebtBalance(debt);
        } catch (error) {
          console.error("Error refreshing balances:", error);
        }
      };

      refreshBalances();
    }
  }, [homeRefreshing, selectedMonth]);


  useEffect(()=>{
    if(generalBalance === null || incomeBalance === null || expenseBalance === null || debtBalance === null){
      setRefreshSignal(true);
    }
    else{
      setRefreshSignal(false);
    }
  },[generalBalance, incomeBalance, expenseBalance, debtBalance])

  return (
    <View style={styles.root}>
      <HeaderComponent page="home" />
      <TransactionListView />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
