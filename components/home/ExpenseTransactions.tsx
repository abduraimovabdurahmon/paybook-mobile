import colors from "@/constants/Colors";
import { useTransaction } from "@/context/TransactionContext";
import { beautySumm } from "@/utils/functions";
import { FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, ScrollView, StyleSheet, Text, View } from "react-native";

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


  const { 
    expenseBalance
  } = useTransaction();

  const fadeAnim = useRef(new Animated.Value(0)).current; 


  const [isLoading, setIsLoading] = useState(false);


  const [transactions, setTransactions] = useState<ExpenseTransaction[]>([]);


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

  // const fetchData = async () => {
  //   if (!selectedMonth) {
  //     return;
  //   }
  //   setTransactions([]);

  //   try {
      

  //     const transactionsResponse = await api.get("/api/transactions/income", {
  //       params: { month: selectedMonth },
  //     });

  //     setTransactions(transactionsResponse.data.transactions);
      
  //   } catch (error) {
  //     console.error("Error fetching income transactions:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  

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
        {/* 1. Oziq-ovqat */}
        <Text style={styles.transactionsDate}>18-may</Text>


        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, {backgroundColor: colors.orange}]}>
            <MaterialCommunityIcons name="food" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Oziq-ovqat</Text>
            <Text style={styles.transactionDescription}>Bozordan sabzavot</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>18:30</Text>
            <Text style={[styles.transactionAmount, {color: colors.red}]}>-120,000 so'm</Text>
          </View>
        </View>

        {/* 2. Transport */}
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, {backgroundColor: colors.blue}]}>
            <FontAwesome5 name="bus" size={20} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Transport</Text>
            <Text style={styles.transactionDescription}>Taksi</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>15:20</Text>
            <Text style={[styles.transactionAmount, {color: colors.red}]}>-35,000 so'm</Text>
          </View>
        </View>

        {/* 3. Kredit to'lovi */}
        <Text style={styles.transactionsDate}>17-may</Text>
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, {backgroundColor: colors.purple}]}>
            <MaterialIcons name="credit-card" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Kredit to'lovi</Text>
            <Text style={styles.transactionDescription}>Oylik to'lov</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>09:00</Text>
            <Text style={[styles.transactionAmount, {color: colors.red}]}>-1,200,000 so'm</Text>
          </View>
        </View>

        {/* 4. Kommunal to'lov */}
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, {backgroundColor: colors.teal}]}>
            <MaterialCommunityIcons name="home-city" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Kommunal</Text>
            <Text style={styles.transactionDescription}>Elekt energiya</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>08:45</Text>
            <Text style={[styles.transactionAmount, {color: colors.red}]}>-320,000 so'm</Text>
          </View>
        </View>

        {/* 5. Kiyim-kechak */}
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, {backgroundColor: colors.pink}]}>
            <MaterialCommunityIcons name="tshirt-crew" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Kiyim</Text>
            <Text style={styles.transactionDescription}>Ko'ylak sotib olish</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>17:15</Text>
            <Text style={[styles.transactionAmount, {color: colors.red}]}>-250,000 so'm</Text>
          </View>
        </View>

        {/* 6. Telefon to'lovi */}
        <Text style={styles.transactionsDate}>16-may</Text>
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, {backgroundColor: colors.cyan}]}>
            <MaterialIcons name="phone-android" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Telefon</Text>
            <Text style={styles.transactionDescription}>Internet paket</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>11:30</Text>
            <Text style={[styles.transactionAmount, {color: colors.red}]}>-75,000 so'm</Text>
          </View>
        </View>

        {/* 7. Restoran */}
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, {backgroundColor: colors.red}]}>
            <MaterialCommunityIcons name="silverware-fork-knife" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Restoran</Text>
            <Text style={styles.transactionDescription}>Oilaviy kechki ovqat</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>20:00</Text>
            <Text style={[styles.transactionAmount, {color: colors.red}]}>-350,000 so'm</Text>
          </View>
        </View>

        {/* 8. Sport */}
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, {backgroundColor: colors.indigo}]}>
            <MaterialCommunityIcons name="dumbbell" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Sport</Text>
            <Text style={styles.transactionDescription}>Fitnes klub obunasi</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>10:00</Text>
            <Text style={[styles.transactionAmount, {color: colors.red}]}>-400,000 so'm</Text>
          </View>
        </View>

        {/* 9. Sovg'a */}
        <Text style={styles.transactionsDate}>15-may</Text>
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, {backgroundColor: colors.yellow}]}>
            <MaterialCommunityIcons name="gift" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Sovg'a</Text>
            <Text style={styles.transactionDescription}>Do'st tug'ilgan kuni</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>14:20</Text>
            <Text style={[styles.transactionAmount, {color: colors.red}]}>-180,000 so'm</Text>
          </View>
        </View>

        {/* 10. Ta'lim */}
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, {backgroundColor: colors.deepPurple}]}>
            <MaterialIcons name="school" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Ta'lim</Text>
            <Text style={styles.transactionDescription}>Kurs to'lovi</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>16:45</Text>
            <Text style={[styles.transactionAmount, {color: colors.red}]}>-600,000 so'm</Text>
          </View>
        </View>
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
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionIcon: {
    // Icon uchun qo'shimcha stillar kerak bo'lsa
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
    color: colors.green,
    fontWeight: "500",
    fontFamily: "JetBrainsMono-Bold",
  },
});