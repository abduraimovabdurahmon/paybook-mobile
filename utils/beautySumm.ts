export const beautySumm = (summ:number) => {
    // input example: 6430488.59
    // output example: 6 430 488.59
    const summString = summ.toFixed(2).toString();
    const parts = summString.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1] || '00';  

    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${formattedIntegerPart}.${decimalPart}`;
}