export type IncomeTransactionType = {
  id: string; // UUID backenddan string sifatida keladi
  icon: string;
  bgColor: string;
  title: string;
  description: string;
  amount: number; // Backenddan BigDecimal keladi, lekin frontendda number sifatida ishlatiladi
  createdAt: string; // YYYY-MM-DD HH24:MI formatida
  time: string; // HH24:MI formatida
};

export type ExpenseTransactionType = {
  id: string; // UUID backenddan string sifatida keladi
  icon: string;
  bgColor: string;
  title: string;
  description: string;
  amount: number; // Backenddan BigDecimal keladi, lekin frontendda number sifatida ishlatiladi
  createdAt: string; // YYYY-MM-DD HH24:MI formatida
  time: string; // HH24:MI formatida
};

export type DebtTransactionType = {
  id: string; // UUID backenddan string sifatida keladi
  icon: string;
  type: 'BORROW' | 'LEND'; // 'BORROW' - qarz olish, 'LEND' - qarz berish
  bgColor: string;
  title: string;
  description: string;
  amount: number; // Backenddan BigDecimal keladi, lekin frontendda number sifatida ishlatiladi
  createdAt: string; // YYYY-MM-DD HH24:MI formatida
  time: string; // HH24:MI formatida
};

export type GroupedIncomeTransactionType = {
  dateKey: string; // "DD - Oy" formatida, masalan, "16 - Iyul"
  transactions: IncomeTransactionType[];
};

export type GroupedExpenseTransactionType = {
  dateKey: string; // "DD - Oy" formatida, masalan, "16 - Iyul"
  transactions: ExpenseTransactionType[];
};

export type GroupedDebtTransactionType = {
  dateKey: string; // "DD - Oy" formatida, masalan, "16 - Iyul"
  transactions: DebtTransactionType[];
};