import { useTransaction } from "@/context/TransactionContext";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpenseStatistics from "./ExcomeStatistics";
import IncomeStatistics from "./IncomeStatistics";
import LoanStatistics from "./LoanStatistics";

export default function StatisticsView() {
  const { transactionType } = useTransaction();


  if (transactionType === "income") {
    return <IncomeStatistics />;
  } 
  else if (transactionType === "expense") {
    return <ExpenseStatistics />;
  }
  else if (transactionType === "loan") {
    return <LoanStatistics />;
  }

  return (
    <View>
      <Text>StatisticsView</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
