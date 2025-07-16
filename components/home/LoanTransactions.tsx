import colors from "@/constants/Colors";
import { useTransaction } from "@/context/TransactionContext";
import { beautySumm } from "@/utils/functions";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, ScrollView, StyleSheet, Text, View } from "react-native";

type DebtBalanceResponse = {
  totalBorrow: number;
  totalLend: number;
}

export default function LoanTransactions() {
  const [isLoading, setIsLoading] = useState(false);

  const {debtBalance} = useTransaction();

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
        {/* 1. Qarz oldim */}
        <Text style={styles.transactionsDate}>18-may</Text>
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, {backgroundColor: colors.red}]}>
            <Ionicons name="arrow-down-circle" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Azizov Sardor</Text>
            <Text style={styles.transactionDescription}>Avto ta'mirlash uchun qarz oldim</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>18:30</Text>
            <Text style={[styles.transactionAmount, {color: colors.red}]}>-500,000 so'm</Text>
          </View>
        </View>

        {/* 2. Qarz berdim */}
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, {backgroundColor: colors.green}]}>
            <Ionicons name="arrow-up-circle" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Karimova Dilfuza</Text>
            <Text style={styles.transactionDescription}>Uy jihozlari uchun qarz berdim</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>15:20</Text>
            <Text style={[styles.transactionAmount, {color: colors.green}]}>+250,000 so'm</Text>
          </View>
        </View>

        {/* 3. Qarz oldim */}
        <Text style={styles.transactionsDate}>17-may</Text>
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, {backgroundColor: colors.red}]}>
            <Ionicons name="arrow-down-circle" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Jamolov Sherzod</Text>
            <Text style={styles.transactionDescription}>Telefon sotib olish uchun qarz oldim</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>09:00</Text>
            <Text style={[styles.transactionAmount, {color: colors.red}]}>-1,000,000 so'm</Text>
          </View>
        </View>

        {/* 4. Qarz berdim */}
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, {backgroundColor: colors.green}]}>
            <Ionicons name="arrow-up-circle" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Opaqulov Jasur</Text>
            <Text style={styles.transactionDescription}>To'y uchun qarz berdim</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>08:45</Text>
            <Text style={[styles.transactionAmount, {color: colors.green}]}>+750,000 so'm</Text>
          </View>
        </View>

        {/* 5. Qarz oldim */}
        <Text style={styles.transactionsDate}>16-may</Text>
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, {backgroundColor: colors.red}]}>
            <Ionicons name="arrow-down-circle" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Nosirova Malika</Text>
            <Text style={styles.transactionDescription}>Tibbiyot xarajatlari uchun qarz oldim</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>11:30</Text>
            <Text style={[styles.transactionAmount, {color: colors.red}]}>-350,000 so'm</Text>
          </View>
        </View>

        {/* 6. Qarz berdim */}
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, {backgroundColor: colors.green}]}>
            <Ionicons name="arrow-up-circle" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Toshmatov Bahodir</Text>
            <Text style={styles.transactionDescription}>Biznes loyihasi uchun qarz berdim</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>20:00</Text>
            <Text style={[styles.transactionAmount, {color: colors.green}]}>+500,000 so'm</Text>
          </View>
        </View>
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
});