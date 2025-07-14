import { useTransaction } from "@/context/TransactionContext";
import React from "react";
import { Text, View } from "react-native";
import ExpenseTransactions from "./ExpenseTransactions";
import IncomeTransactions from "./IncomeTransactions";
import LoanTransactions from "./LoanTransactions";

export default function TransactionListView() {
  const { transactionType } = useTransaction();

  if (transactionType === "income") {
    return <IncomeTransactions />;
  }
  else if(transactionType === "expense"){
    return <ExpenseTransactions />
  }
  else if(transactionType === "loan"){
    return <LoanTransactions />
  }

    return (
        <View>
        <Text>Transaction List View</Text>
        {/* Other transaction types can be handled here */}
        </View>
    );
}
