interface IncomeTransaction {
    id: string;
    icon: string;
    bgColor: string;
    title: string;
    description: string;
    amount: number;
    createdAt: string;
}

interface GroupedTransactions {
    [date: string]: IncomeTransaction[];
}

export const shortenDescription = (description: string): string => {
    if (description.length > 15) {
        return `${description.substring(0, 15)}...`;
    }
    return description;
};


// Format group date in "DD - Month" format with Uzbek month names
export const formatGroupDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.getMonth();

    const monthNames = [
        'Yanvar', 'Fevral', 'Mart',
        'Aprel', 'May', 'Iyun',
        'Iyul', 'Avgust', 'Sentabr',
        'Oktabr', 'Noyabr', 'Dekabr'
    ];

    return `${day} - ${monthNames[month]}`;
};


export const beautySumm = (summ: number) => {
    const summString = summ.toFixed(2).toString();
    const parts = summString.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1] || '00';

    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${formattedIntegerPart}.${decimalPart}`;
}

export const formatDateDisplay = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return "Bugun";
    } else if (date.toDateString() === yesterday.toDateString()) {
        return "Kecha";
    } else {
        return formatGroupDate(date);
    }
};

// Group transactions by date
export const groupTransactionsByDate = (transactions: IncomeTransaction[]): GroupedTransactions => {
    const grouped: GroupedTransactions = {};

    transactions.forEach((transaction) => {
        const date = new Date(transaction.createdAt);
        const dateKey = formatGroupDate(date);

        if (!grouped[dateKey]) {
            grouped[dateKey] = [];
        }

        grouped[dateKey].push(transaction);
    });

    return grouped;
};


// Format time from createdAt
export const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
};
