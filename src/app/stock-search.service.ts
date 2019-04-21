import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { Stock, StockEntry } from './models/models';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StockSearchService {

  constructor(private http: HttpClient) { }

  private makeRequest(endpoint: string, props: any) {
    const params = Object.assign({}, props, { endpoint });

    const qs = Object.keys(params).map((val, i) => `${i === 0 ? '?' : '&'}${val}=${params[val]}`).join('');
    return this.http.get(`https://keithdaulton.com/stocks.php${qs}`);
  }

  public findStocksBySymbol(symbol: string): Observable<Stock[]> {
    return this.makeRequest('stock_search', {
        search_by: 'symbol',
        search_term: symbol
    }).pipe(
      map((data: any) => {
        if (!data || !data.data || !data.data.length) {
            return [];
        }
        return data.data.map(_ => {
            return <Stock>{
                symbol: _.symbol,
                name: _.name,
                currency: _.currency,
                price: parseFloat(_.price),
                exchangeLong: _.stock_exchange_long,
                exchangeShort: _.stock_exchange_short
            };
        });
      })
    );
  }

  public findStockHistoryBySymbol(symbol: string): Observable<StockEntry[]> {
    const theDate = moment();
    const dateEnd = theDate.format('YYYY-MM-DD');
    const dateStart = theDate.subtract(2, 'weeks').format('YYYY-MM-DD');
    return this.makeRequest('history', {
      sort: 'newest',
      symbol: symbol,
      date_from: dateStart,
      date_to: dateEnd
    }).pipe(
      map((data: any) => {
        if (!data || !data.history) {
            return [];
        }

        return Object.keys(data.history).map(key => {
            let point = Object.assign({}, data.history[key], {
                date: key
            });

            Object.keys(point).filter(_ => _ !== 'date').forEach(key => {
                point[key] = parseFloat(point[key]);
            });

            return <StockEntry>point;
        });
      })
    );
  }
}
