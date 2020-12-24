export default function amountFormat(amount) {
    return parseFloat(amount/100).toFixed(2);
}