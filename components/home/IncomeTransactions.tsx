import colors from "@/constants/Colors";
import { IncomeTransactionType } from "@/constants/Types";
import { useTransaction } from "@/context/TransactionContext";
import { beautySumm, formatDateDisplay, shortenDescription } from "@/utils/functions";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function IncomeTransactions() {
  const { incomeBalance, incomeTransactions } = useTransaction();
  const [isLoading, setIsLoading] = useState(true);


  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setIsLoading(incomeBalance === null || incomeTransactions === undefined);
    if (incomeBalance !== null && incomeTransactions !== undefined) {
      console.log(incomeTransactions)
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [incomeBalance, incomeTransactions]);

  const handleTransactionPress = (transaction: IncomeTransactionType) => {
    console.log("Transaction pressed:", transaction.id);
  };

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
          <Animated.Text style={[styles.amount, { opacity: fadeAnim }]}>
            {isLoading ? (
              <ActivityIndicator color={colors.green} />
            ) : (
              <>{beautySumm(incomeBalance)}</>
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

        {!isLoading && incomeTransactions?.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tranzaksiyalar mavjud emas</Text>
          </View>
        )}

        {!isLoading &&
          incomeTransactions?.map(({ dateKey, transactions }) => (
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
                  <View
                    style={[
                      styles.transactionIconBox,
                      { backgroundColor: transaction.bgColor || colors.blue },
                    ]}
                  >
                    <MaterialIcons
                      name={(transaction.icon as React.ComponentProps<typeof MaterialIcons>["name"]) || "attach-money"}
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
                      {transaction.time}
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
          ))}
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