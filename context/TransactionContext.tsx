// TransactionContext.tsx
import { GroupedDebtTransactionType, GroupedExpenseTransactionType, GroupedIncomeTransactionType } from '@/constants/Types';
import React, { createContext, useContext, useState } from 'react';

type TransactionType = 'income' | 'expense' | 'loan';

type MonthsType = {
  label: string;
  value: string;
}

type DebtBalanceType = {
  totalBorrow: number | null;
  totalLend: number | null;
}

interface TransactionContextType {
  transactionType: TransactionType;
  setTransactionType: (type: TransactionType) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  refreshSignal: boolean;
  setRefreshSignal: (refreshSignal: boolean) => void;

  // months
  months: Array<MonthsType>
  setMonths: (months: Array<MonthsType>) => void;
  // general balance
  generalBalance: number | null;
  setGeneralBalance: (generalBalance: number | null) => void;
  // income balance
  incomeBalance: number | null;
  setIncomeBalance: (incomeBalance: number | null) => void;
  // expense balance
  expenseBalance: number | null;
  setExpenseBalance: (expenseBalance: number | null) => void;
  // debt balance
  debtBalance: DebtBalanceType;
  setDebtBalance: (debtBalance: DebtBalanceType) => void;

  // income transactions
  incomeTransactions: GroupedIncomeTransactionType[];
  setIncomeTransactions: (incomeTransactions: GroupedIncomeTransactionType[]) => void;

  // expense transactions
  expenseTransactions: GroupedExpenseTransactionType[];
  setExpenseTransactions: (expenseTransactions: GroupedExpenseTransactionType[]) => void;

  // debt transactions
  debtTransactions: GroupedDebtTransactionType[];
  setDebtTransactions: (debtTransactions: GroupedDebtTransactionType[]) => void;

}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [transactionType, setTransactionType] = useState<TransactionType>('income');

  // month
  const [months, setMonths] = useState<MonthsType[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('');


  // Refresh qilish haqida signal berish
  const [refreshSignal, setRefreshSignal] = useState(false);


  // Umumiy balance
  const [generalBalance, setGeneralBalance] = useState<number | null>(null);

  // Income balance
  const [incomeBalance, setIncomeBalance] = useState<number | null>(null);

  // Expense balance
  const [expenseBalance, setExpenseBalance] = useState<number | null>(null);

  // Debt balance
  const [debtBalance, setDebtBalance] = useState<DebtBalanceType>({ totalBorrow: null, totalLend: null });

  // Income transactions list 
  const [incomeTransactions, setIncomeTransactions] = useState<GroupedIncomeTransactionType[]>([]);

  // Expense transactions list
  const [expenseTransactions, setExpenseTransactions] = useState<GroupedExpenseTransactionType[]>([]);

  // Debt transactions list
  const [debtTransactions, setDebtTransactions] = useState<GroupedDebtTransactionType[]>([]);

  const value = { 
    refreshSignal, 
    setRefreshSignal, 
    transactionType, setTransactionType,
    selectedMonth, setSelectedMonth,
    // months
    months, setMonths,
    // Umumiy balance
    generalBalance, setGeneralBalance,
    // Income balance
    incomeBalance, setIncomeBalance,
    // Expense balance
    expenseBalance, setExpenseBalance, 
    // Debt balance
    debtBalance, setDebtBalance,
    // Income transactions
    incomeTransactions, setIncomeTransactions,
    // Expense transactions
    expenseTransactions, setExpenseTransactions,
    // Debt transactions
    debtTransactions, setDebtTransactions,
  };
    
  
  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return context;
};