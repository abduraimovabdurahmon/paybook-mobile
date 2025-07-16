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

export type GroupedIncomeTransactionType = {
  dateKey: string; // "DD - Oy" formatida, masalan, "16 - Iyul"
  transactions: IncomeTransactionType[];
};