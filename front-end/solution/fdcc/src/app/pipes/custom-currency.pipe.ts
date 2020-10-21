import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'currency' })
export class AmountPipe implements PipeTransform {
    cMap={
        "USD": "$",
        "EUR": "€",
        "CRC": "₡",
        "GBP": "£",
        "ILS": "₪",
        "INR": "₹",
        "JPY": "¥",
        "KRW": "₩",
        "NGN": "₦",
        "PHP": "₱",
        "PLN": "zł",
        "PYG": "₲",
        "THB": "฿",
        "UAH": "₴",
        "VND": "₫"
    }
    transform(amount: number, t_symbol: string = null): any {
        let symbol=this.cMap[t_symbol];
        if(!amount) return symbol ? symbol + " -" : "";
        amount=amount/100;
        let roundValue = amount.toFixed(Math.max(0, ~~2));
        return symbol ? symbol + " " + roundValue : roundValue;
    

    

    }
}