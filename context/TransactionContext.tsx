// TransactionContext.tsx
import React, { createContext, useContext, useState } from 'react';

type TransactionType = 'income' | 'expense' | 'loan';

interface TransactionContextType {
  transactionType: TransactionType;
  setTransactionType: (type: TransactionType) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  refreshSignal: boolean;
  triggerRefresh: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [transactionType, setTransactionType] = useState<TransactionType>('income');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [refreshSignal, setRefreshSignal] = useState(false);

  const triggerRefresh = () => {
    setRefreshSignal(prev => !prev); // Toggle to trigger refresh
  };

  const value = { 
    transactionType, setTransactionType,
    selectedMonth, setSelectedMonth,
    refreshSignal, triggerRefresh
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