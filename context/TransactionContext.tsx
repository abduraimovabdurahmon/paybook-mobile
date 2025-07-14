import React, { createContext, useContext, useState } from 'react';

type TransactionType = 'income' | 'expense' | 'loan';

interface TransactionContextType {
  transactionType: TransactionType;
  setTransactionType: (type: TransactionType) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [transactionType, setTransactionType] = useState<TransactionType>('income');
  
  return (
    <TransactionContext.Provider value={{ transactionType, setTransactionType }}>
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