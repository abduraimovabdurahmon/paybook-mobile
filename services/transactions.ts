import api from "./api";

// Fetch available months
export const fetchMonths = async () => {
    try {
        const response = await api.get("/api/transactions/months");
        console.log("Fetched months:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching months:", error);
        throw error; // Re-throw to handle in component
    } finally {
        console.log("Month fetching completed");
    }
};

// Fetch general balance
export const fetchGeneralBalance = async ({ selectedMonth }: { selectedMonth: string }) => {
    try {
        const response = await api.get("/api/transactions/balance", {
            params: { month: selectedMonth },
        });
        console.log("Fetched balance:", response.data.balance);
        return response.data.balance;
    } catch (error) {
        console.error("Error fetching general balance:", error);
        throw error;
    }
};

// Fetch income balance
export const fetchIncomeBalance = async ({ selectedMonth }: { selectedMonth: string }) => {
    try {
        const response = await api.get("/api/transactions/income/balance", {
            params: { month: selectedMonth },
        });
        console.log("Fetched income balance:", response.data.balance);
        return response.data.balance;
    } catch (error) {
        console.error("Error fetching income balance:", error);
        throw error;
    }
};

// Fetch expense balance
export const fetchExpenseBalance = async ({ selectedMonth }: { selectedMonth: string }) => {
    try {
        const response = await api.get("/api/transactions/expense/balance", {
            params: { month: selectedMonth },
        });
        console.log("Fetched expense balance:", response.data.balance);
        return response.data.balance;
    } catch (error) {
        console.error("Error fetching expense balance:", error);
        throw error;
    }
};

// Fetch debt balance
export const fetchDebtBalance = async ({ selectedMonth }: { selectedMonth: string }) => {
    try {
        const response = await api.get("/api/transactions/debt/balance", {
            params: { month: selectedMonth },
        });
        console.log("Fetched debt balance:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching debt balance:", error);
        throw error;
    }
};

// Fetch income transactions list
export const fetchIncomeTransactionsList = async ({ selectedMonth }: { selectedMonth: string }) => {
    try {
        const transactionsResponse = await api.get("/api/transactions/income", {
            params: { month: selectedMonth },
        });
        return transactionsResponse.data;
    } catch (error) {
        console.log(error);
    }
}