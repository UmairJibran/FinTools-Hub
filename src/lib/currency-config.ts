type NumberSystem = 'western' | 'southAsian';

interface CurrencyConfig {
    symbol: string;
    name: string;
    numberSystem: NumberSystem;
}

export const CURRENCY_CONFIG: Record<string, CurrencyConfig> = {
    PKR: {
        symbol: 'Rs',
        name: 'Pakistani Rupee',
        numberSystem: 'southAsian'
    },
    INR: {
        symbol: '₹',
        name: 'Indian Rupee',
        numberSystem: 'southAsian'
    },
    USD: {
        symbol: '$',
        name: 'US Dollar',
        numberSystem: 'western'
    },
    EUR: {
        symbol: '€',
        name: 'Euro',
        numberSystem: 'western'
    },
    GBP: {
        symbol: '£',
        name: 'British Pound',
        numberSystem: 'western'
    }
};

export function formatNumber(value: number, currency: string): string {
    const config = CURRENCY_CONFIG[currency];
    if (!config) return value.toLocaleString();

    if (config.numberSystem === 'southAsian') {
        if (value >= 1000000000000) { // 1 Kharab (100 Arab)
            const kharabValue = value / 1000000000000;
            return `${Number.isInteger(kharabValue) ? kharabValue : kharabValue.toFixed(2)} Kharab`;
        } else if (value >= 10000000000) { // 1 Arab (100 Crore)
            const arabValue = value / 10000000000;
            return `${Number.isInteger(arabValue) ? arabValue : arabValue.toFixed(2)} Ar`;
        } else if (value >= 10000000) { // 1 Crore
            const crValue = value / 10000000;
            return `${Number.isInteger(crValue) ? crValue : crValue.toFixed(2)} Cr`;
        } else if (value >= 100000) { // 1 Lac
            const lacValue = value / 100000;
            return `${Number.isInteger(lacValue) ? lacValue : lacValue.toFixed(2)} Lac`;
        } else if (value >= 1000) {
            return value.toLocaleString('en-IN');
        }
    }

    // Western number system
    if (value >= 1000000000000000) { // 1 Quadrillion
        const qValue = value / 1000000000000000;
        return `${Number.isInteger(qValue) ? qValue : qValue.toFixed(2)}Q`;
    } else if (value >= 1000000000000) { // 1 Trillion
        const tValue = value / 1000000000000;
        return `${Number.isInteger(tValue) ? tValue : tValue.toFixed(2)}T`;
    } else if (value >= 1000000000) { // 1 Billion
        const bValue = value / 1000000000;
        return `${Number.isInteger(bValue) ? bValue : bValue.toFixed(2)}B`;
    } else if (value >= 1000000) { // 1 Million
        const mValue = value / 1000000;
        return `${Number.isInteger(mValue) ? mValue : mValue.toFixed(2)}M`;
    } else if (value >= 1000) {
        return value.toLocaleString('en-US');
    }

    return value.toString();
}

export function formatCurrency(value: number | string, currency: string): string {
    if (typeof value === 'string') {
        value = value.replace(/[^0-9.-]+/g, "");
        value = parseFloat(value);
    }
    const config = CURRENCY_CONFIG[currency];
    if (!config) return `${currency} ${value.toLocaleString()}`;

    const formattedNumber = formatNumber(value, currency);
    return `${config.symbol} ${formattedNumber}`;
} 