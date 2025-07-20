import colors from "@/constants/Colors";
import { ExpenseTransactionType } from "@/constants/Types";
import { useTransaction } from "@/context/TransactionContext";
import { beautySumm, formatDateDisplay } from "@/utils/functions";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ExpenseTransaction {
  id: string;
  icon: string;
  bgColor: string;
  title: string;
  description: string;
  amount: number;
  createdAt: string;
}

export default function ExpenseTransactions() {

const { expenseBalance, expenseTransactions } = useTransaction();
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setIsLoading(expenseBalance === null || expenseTransactions === undefined);
    JSON.stringify(expenseTransactions) === "[]" && setIsLoading(false);
    if (expenseBalance !== null && expenseTransactions !== undefined) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [expenseBalance, expenseTransactions]);

  const handleTransactionPress = (transaction: ExpenseTransactionType) => {
    console.log("Transaction pressed:", transaction.id);
  };

  useEffect(()=>{
    setIsLoading(expenseBalance === null);
    if(expenseBalance){
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [expenseBalance])
  

  

  return (
    <View style={styles.mainContainer}>
      {/* Umumiy balans card */}
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <View style={styles.iconTitleContainer}>
            <Ionicons
              name="cash-outline"
              size={24}
              color={colors.red}
              style={styles.icon}
            />
            <Text style={styles.title}>Umumiy chiqim:</Text>
          </View>
          <Animated.Text style={[styles.amount, { opacity: fadeAnim }]}>
            {isLoading ? (
              <ActivityIndicator color={colors.red}/>
            ) : (
              <>-{beautySumm(expenseBalance)}</>
            )}
          </Animated.Text>
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

        {!isLoading && expenseTransactions?.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tranzaksiyalar mavjud emas</Text>
          </View>
        )}

        {!isLoading &&
          expenseTransactions?.map(({ dateKey, transactions }) => (
            <View key={dateKey}>
              <Text style={styles.transactionsDate}>
                {formatDateDisplay(dateKey)}
              </Text>
              {transactions?.map((transaction) => (
                <TouchableOpacity
                  key={transaction.id}
                  style={styles.transactionBox}
                  onPress={() => handleTransactionPress(transaction)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.transactionIconBox, { backgroundColor: transaction.bgColor || colors.blue }]}>
                    <MaterialIcons
                      name={(transaction.icon as React.ComponentProps<typeof MaterialIcons>["name"]) || "attach-money"}
                      size={24}
                      color={colors.white}
                    />
                  </View>
                  <View style={styles.transactionContent}>
                    <View style={styles.transactionInfo}>
                      <Text
                        style={styles.transactionTitle}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {transaction.title}
                      </Text>
                      <Text style={styles.transactionTime}>
                        {transaction.time}
                      </Text>
                    </View>
                    <View style={styles.transactionDetails}>
                      <Text
                        style={styles.transactionDescription}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {transaction.description}
                      </Text>
                      <Text
                        style={[
                          styles.transactionAmount,
                          { color: colors.red },
                        ]}
                      >
                        -{beautySumm(transaction.amount)} so'm
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

// Styles qismi o'zgarmaydi, avvalgidek qoladi

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  root: {
    flex: 1,
    width: "100%",
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
    color: colors.red,
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
    width: "100%",
    marginBottom: 12,
  },
  transactionIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionContent: {
    flex: 1,
    flexDirection: "column",
  },
  transactionInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  transactionTitle: {
    fontSize: 14,
    color: colors.dark,
    fontWeight: "500",
    fontFamily: "JetBrainsMono-Medium",
    flex: 1,
  },
  transactionTime: {
    fontSize: 12,
    color: colors.gray,
    fontFamily: "JetBrainsMono-Regular",
  },
  transactionDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionDescription: {
    fontSize: 10,
    color: colors.gray,
    fontFamily: "JetBrainsMono-Regular",
    flex: 1,
    marginRight: 8,
  },
  transactionAmount: {
    fontSize: 14,
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