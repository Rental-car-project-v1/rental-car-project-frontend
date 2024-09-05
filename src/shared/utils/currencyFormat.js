export default function currencyFormat(number, currency = 'VND', displayCurrency = true) {
    let options = displayCurrency ? { style: 'currency', currency: currency } : { minimumFractionDigits: 0, maximumFractionDigits: 2 };
    let formattedNumber = number.toLocaleString('vi-VN', options);

    if (!displayCurrency) {
        formattedNumber = formattedNumber.replace(/₫|USD|EUR|¥|£|₹|₩|฿|₽|₺|ر.س|د.إ/g, '').trim();
    }

    return formattedNumber;
}