import { AppProvider } from "@/context/AppContext";
import { AuthProvider } from "@/context/AuthContext";
import { TransactionProvider } from "@/context/TransactionContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <AuthProvider>
        <TransactionProvider>{children}</TransactionProvider>
      </AuthProvider>
    </AppProvider>
  );
}
