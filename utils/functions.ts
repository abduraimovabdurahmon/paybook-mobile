// @/utils/functions.ts

// @/utils/functions.ts

export const shortenDescription = (description: string): string => {
  if (description.length > 15) {
    return `${description.substring(0, 15)}...`;
  }
  return description;
};

export const beautySumm = (summ: number | null): string => {
  if (summ === null) {
    return "0.00";
  }

  const summString = summ.toFixed(2).toString();
  const parts = summString.split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] || "00";

  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${formattedIntegerPart}.${decimalPart}`;
};

export const formatDateDisplay = (dateKey: string): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const [day, month] = dateKey.split(" - ");
  const monthIndex = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ].indexOf(month);
  const date = new Date(today.getFullYear(), monthIndex, parseInt(day));

  if (date.toDateString() === today.toDateString()) return "Bugun";
  if (date.toDateString() === yesterday.toDateString()) return "Kecha";
  return dateKey;
};