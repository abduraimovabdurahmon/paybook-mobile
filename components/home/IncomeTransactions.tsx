import colors from "@/constants/Colors";
import { useApp } from "@/context/AppContext";
import { useTransaction } from "@/context/TransactionContext";
import api from "@/services/api";

import {
  beautySumm,
  formatDateDisplay,
  formatTime,
  groupTransactionsByDate,
  shortenDescription,
} from "@/utils/functions";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface IncomeTransaction {
  id: string;
  icon: string;
  bgColor: string;
  title: string;
  description: string;
  amount: number;
  createdAt: string;
}

export default function IncomeTransactions() {
  const { selectedMonth, refreshSignal } = useTransaction();
  const [incomeBalance, setIncomeBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<IncomeTransaction[]>([]);
  const { refreshing, setRefreshing } = useApp();

  const fetchData = async () => {
    if (!selectedMonth) {
      setIsLoading(false);
      return;
    }
    setTransactions([]);

    try {
      setIsLoading(true);
      const balanceResponse = await api.get(
        "/api/transactions/income/balance",
        {
          params: { month: selectedMonth },
        }
      );

      const transactionsResponse = await api.get("/api/transactions/income", {
        params: { month: selectedMonth },
      });

      setIncomeBalance(balanceResponse.data.balance);
      setTransactions(transactionsResponse.data.transactions);
      setRefreshing(false);
    } catch (error) {
      console.error("Error fetching income transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedMonth, refreshSignal]);

    useEffect(() => {
      if (refreshing) {
        fetchData();
      }
    }, [refreshing]);

  // Handle transaction press
  const handleTransactionPress = (transaction: IncomeTransaction) => {
    console.log("Transaction pressed:", transaction.id);
  };

  const groupedTransactions = groupTransactionsByDate(transactions);

  return (
    <View style={styles.mainContainer}>
      {/* Umumiy balans card */}
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <View style={styles.iconTitleContainer}>
            <Ionicons
              name="cash-outline"
              size={24}
              color={colors.green}
              style={styles.icon}
            />
            <Text style={styles.title}>Umumiy kirim:</Text>
          </View>
          <Text style={styles.amount}>
            {isLoading ? (
              <ActivityIndicator color={colors.green} />
            ) : (
              <>{beautySumm(incomeBalance)}</>
            )}
          </Text>
        </View>
      </View>

      {/* Tranzaksiyalar ro'yxati */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.transactionsScroll}
      >
        {isLoading && (
          <View style={styles.emptyContainer}>
            <ActivityIndicator
              size="large"
              color={colors.primary}
              style={{ marginTop: 20 }}
            />
            <Text style={styles.emptyText}>Yuklanmoqda ...</Text>
          </View>
        )}

        {Object.entries(groupedTransactions).map(
          ([date, transactionsForDate]) => (
            <View key={date}>
              <Text style={styles.transactionsDate}>
                {formatDateDisplay(transactionsForDate[0].createdAt)}
              </Text>
              {transactionsForDate.map((transaction) => (
                <TouchableOpacity
                  key={transaction.id}
                  style={styles.transactionBox}
                  onPress={() => handleTransactionPress(transaction)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.transactionIconBox,
                      { backgroundColor: transaction.bgColor || colors.blue },
                    ]}
                  >
                    <MaterialIcons
                      name={(transaction.icon as any) || "attach-money"}
                      size={24}
                      color={colors.white}
                    />
                  </View>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionTitle}>
                      {transaction.title}
                    </Text>
                    <Text style={styles.transactionDescription}>
                      {shortenDescription(transaction.description)}
                    </Text>
                  </View>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionTime}>
                      {formatTime(transaction.createdAt)}
                    </Text>
                    <Text
                      style={[
                        styles.transactionAmount,
                        { color: colors.green },
                      ]}
                    >
                      +{beautySumm(transaction.amount)} so'm
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    width: "100%",
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    color: colors.dark,
    marginLeft: 8,
    fontWeight: "500",
    fontFamily: "JetBrainsMono-Bold",
  },
  amount: {
    fontSize: 14,
    color: colors.green,
    fontWeight: "500",
    fontFamily: "JetBrainsMono-Bold",
  },
  transactionsScroll: {
    width: "100%",
  },
  transactionsDate: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: "500",
    fontFamily: "JetBrainsMono-Bold",
    marginBottom: 8,
    marginLeft: 10,
  },
  transactionBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    width: "99%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 12,
  },
  transactionIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
    marginRight: 8,
  },
  transactionTitle: {
    fontSize: 12,
    color: colors.dark,
    fontWeight: "500",
    fontFamily: "JetBrainsMono-Medium",
    marginBottom: 4,
  },
  transactionDescription: {
    fontSize: 10,
    color: colors.gray,
    fontFamily: "JetBrainsMono-Regular",
  },
  transactionDetails: {
    alignItems: "flex-end",
  },
  transactionTime: {
    fontSize: 12,
    color: colors.gray,
    fontFamily: "JetBrainsMono-Regular",
    marginBottom: 4,
  },
  transactionAmount: {
    fontSize: 14,
    color: colors.green,
    fontWeight: "500",
    fontFamily: "JetBrainsMono-Bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray,
    fontFamily: "JetBrainsMono-Regular",
  },
});
