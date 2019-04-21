export interface Stock {
    symbol: string;
    name: string;
    currency: string;
    price: number;
    exchangeLong: string;
    exchangeShort: string;
}

export interface StockEntry {
    date: string;
    open: number;
    close: number;
    high: number;
    low: number;
    volume: number;
}