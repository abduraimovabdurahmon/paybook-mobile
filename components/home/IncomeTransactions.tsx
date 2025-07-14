import colors from "@/constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function IncomeTransactions() {
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
          <Text style={styles.amount}>+12,750,000 so'm</Text>
        </View>
      </View>

      {/* Tranzaksiyalar ro'yxati */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.transactionsScroll}
      >
        {/* Sana: Bugun */}
        <Text style={styles.transactionsDate}>18-may</Text>
        
        {/* 1. Oylik ish haqqi */}
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, { backgroundColor: colors.blue }]}>
            <MaterialIcons name="work" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Oylik ish haqqi</Text>
            <Text style={styles.transactionDescription}>Asosiy ish joyidan oylik</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>12:03</Text>
            <Text style={[styles.transactionAmount, { color: colors.green }]}>+5,600,000 so'm</Text>
          </View>
        </View>

        {/* 2. Freelance ish */}
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, { backgroundColor: colors.cyan }]}>
            <MaterialIcons name="laptop" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Freelance ish</Text>
            <Text style={styles.transactionDescription}>Veb-sayt loyihasi uchun to'lov</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>09:45</Text>
            <Text style={[styles.transactionAmount, { color: colors.green }]}>+1,200,000 so'm</Text>
          </View>
        </View>

        {/* Sana: Kecha */}
        <Text style={styles.transactionsDate}>17-may</Text>

        {/* 3. Biznes daromadi */}
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, { backgroundColor: colors.purple }]}>
            <MaterialIcons name="business" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Biznes daromadi</Text>
            <Text style={styles.transactionDescription}>Do'kon savdo daromadi</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>15:30</Text>
            <Text style={[styles.transactionAmount, { color: colors.green }]}>+2,500,000 so'm</Text>
          </View>
        </View>

        {/* 4. Investitsiya foydasi */}
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, { backgroundColor: colors.yellow }]}>
            <MaterialIcons name="trending-up" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Investitsiya foydasi</Text>
            <Text style={styles.transactionDescription}>Fond bozoridagi foyda</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>14:00</Text>
            <Text style={[styles.transactionAmount, { color: colors.green }]}>+800,000 so'm</Text>
          </View>
        </View>

        {/* Sana: 16-may */}
        <Text style={styles.transactionsDate}>16-may</Text>

        {/* 5. Ijara to'lovi */}
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, { backgroundColor: colors.teal }]}>
            <MaterialIcons name="home" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Ijara to'lovi</Text>
            <Text style={styles.transactionDescription}>Xonadon ijarasi uchun to'lov</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>10:15</Text>
            <Text style={[styles.transactionAmount, { color: colors.green }]}>+1,000,000 so'm</Text>
          </View>
        </View>

        {/* 6. Bonus */}
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, { backgroundColor: colors.orange }]}>
            <Ionicons name="gift-outline" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Bonus</Text>
            <Text style={styles.transactionDescription}>Ishdagi choraklik bonus</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>11:00</Text>
            <Text style={[styles.transactionAmount, { color: colors.green }]}>+500,000 so'm</Text>
          </View>
        </View>

        {/* Sana: 15-may */}
        <Text style={styles.transactionsDate}>15-may</Text>

        {/* 7. Sotuvdan tushum */}
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, { backgroundColor: colors.pink }]}>
            <MaterialIcons name="shopping-cart" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Sotuvdan tushum</Text>
            <Text style={styles.transactionDescription}>Eski mebel sotilishi</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>16:20</Text>
            <Text style={[styles.transactionAmount, { color: colors.green }]}>+300,000 so'm</Text>
          </View>
        </View>

        {/* 8. Naqd pul qaytarish */}
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, { backgroundColor: colors.indigo }]}>
            <Ionicons name="return-up-back-outline" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Naqd pul qaytarish</Text>
            <Text style={styles.transactionDescription}>Do'stdan qarz qaytarildi</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>13:10</Text>
            <Text style={[styles.transactionAmount, { color: colors.green }]}>+400,000 so'm</Text>
          </View>
        </View>

        {/* Sana: 14-may */}
        <Text style={styles.transactionsDate}>14-may</Text>

        {/* 9. Grant */}
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, { backgroundColor: colors.deepPurple }]}>
            <MaterialIcons name="school" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Grant</Text>
            <Text style={styles.transactionDescription}>Ilmiy loyiha uchun grant</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>08:30</Text>
            <Text style={[styles.transactionAmount, { color: colors.green }]}>+350,000 so'm</Text>
          </View>
        </View>

        {/* 10. Sovg'a puli */}
        <View style={styles.transactionBox}>
          <View style={[styles.transactionIconBox, { backgroundColor: colors.red }]}>
            <Ionicons name="heart-outline" size={24} color={colors.white} />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Sovg'a puli</Text>
            <Text style={styles.transactionDescription}>Tug'ilgan kun sovg'asi</Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTime}>19:00</Text>
            <Text style={[styles.transactionAmount, { color: colors.green }]}>+100,000 so'm</Text>
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