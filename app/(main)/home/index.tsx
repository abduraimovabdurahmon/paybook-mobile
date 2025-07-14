import HeaderComponent from "@/components/HeaderComponent";
import TransactionListView from "@/components/home/TransactionListView";
import colors from "@/constants/Colors";
import { useTransaction } from "@/context/TransactionContext";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
    const { transactionType, setTransactionType } = useTransaction();

  return (
    <View style={styles.root}>
      <HeaderComponent />
      {/* List view komponenti keladi */}
      <TransactionListView/>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
