import colors from "@/constants/Colors";
import { DebtTransactionType } from "@/constants/Types";
import { useTransaction } from "@/context/TransactionContext";
import { beautySumm, formatDateDisplay, shortenDescription } from "@/utils/functions";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function LoanTransactions() {

  const { debtBalance, debtTransactions } = useTransaction();

  const [isLoading, setIsLoading] = useState(true);


  const fadeAnim = useRef(new Animated.Value(0)).current; 


  useEffect(()=>{
    setIsLoading(debtBalance.totalBorrow === null || debtBalance.totalLend === null);
    if(debtBalance.totalBorrow && debtBalance.totalLend){
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  },[debtBalance])


    const handleTransactionPress = (transaction: DebtTransactionType) => {
      console.log("Transaction pressed:", transaction.id);
    };


  return (
    <View style={styles.mainContainer}>
      {/* Umumiy qarz balansi card */}
      <View style={styles.card}>
        <View style={styles.balanceContainer}>
          {/* Qarz oldim (I owe) */}
          <View style={styles.balanceItem}>
            <View style={styles.iconTitleContainer}>
              <Ionicons
                name="arrow-down-circle-outline"
                size={24}
                color={colors.red}
                style={styles.icon}
              />
              <Text style={styles.title}>Qarz oldim:</Text>
            </View>
            <Animated.Text style={[styles.amount, {color: colors.red, opacity: fadeAnim}]}>
              {isLoading ? (
                <ActivityIndicator color={colors.red}/>
              ) : (
                <>-{beautySumm(debtBalance.totalBorrow)}</>
              )}
            </Animated.Text>
          </View>
          
          {/* Qarz berdim (I'm owed) */}
          <View style={styles.balanceItem}>
            <View style={styles.iconTitleContainer}>
              <Ionicons
                name="arrow-up-circle-outline"
                size={24}
                color={colors.green}
                style={styles.icon}
              />
              <Text style={styles.title}>Qarz berdim:</Text>
            </View>
             <Animated.Text style={[styles.amount, {color: colors.green, opacity: fadeAnim}]}>
              {isLoading ? (
                <ActivityIndicator color={colors.green}/>
              ) : (
                <>+{beautySumm(debtBalance.totalLend)}</>
              )}
            </Animated.Text>
          </View>
        </View>
      </View>

      {/* Qarz tranzaksiyalari ro'yxati */}
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

        {!isLoading && debtTransactions?.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tranzaksiyalar mavjud emas</Text>
          </View>
        )}

        {!isLoading &&
          debtTransactions?.map(({ dateKey, transactions }) => (
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
                    <Feather name={
                      (transaction.icon as React.ComponentProps<typeof Feather>["name"]) || "dollar-sign"
                    } size={24} color={colors.white} />
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
                        { color: transaction.type === "BORROW" ? colors.red : colors.green },
                      ]}
                    >
                      {transaction.type === "BORROW" ? "-" : "+"}{beautySumm(transaction.amount)} so'm
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
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceItem: {
    width: "48%", // Slightly less than half to account for space-between
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
    marginLeft: 10
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
  transactionInfo: {
    flex: 1,
    marginRight: 8,
  },
  transactionTitle: {
    fontSize: 14,
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