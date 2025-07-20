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


export type CategoryType = {
  id: string; // UUID backenddan string sifatida keladi
  bgColor: string; // Rangi, masalan, "#3366FF"
  icon: string; // Ikkilik kodli ikon nomi, masalan, "transport-icon"
  keyword: string; // Kalit so'z, masalan, "transport"
  title: string; // Kategoriya nomi, masalan, "Transportation"
  type: 'INCOME' | 'EXPENSE' | 'DEBT'; // Kategoriya turi, "INCOME" yoki "EXPENSE" yoki "DEBT"
};