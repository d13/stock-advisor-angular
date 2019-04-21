import { Component, OnInit, Input } from '@angular/core';
import { Stock, StockEntry } from '../models/models';
import { StockSearchService } from '../stock-search.service';
import { Subscription } from 'rxjs';
import { observeProperty } from '../helpers/observable';
import { map, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.scss']
})
export class StockReportComponent implements OnInit {
  @Input() stock: Stock;
  public stock$ = observeProperty(this as StockReportComponent, 'stock');

  history: StockEntry[];
  stockSub: Subscription;

  constructor(private stockSearchService: StockSearchService) { }

  ngOnInit() {
    this.stockSub = this.stock$
      .pipe(
        map((stock: Stock) => stock && stock.symbol),
        distinctUntilChanged()
      ).subscribe((symbol: string) => {
        this.onStockEntered(symbol);
      });
  }

  ngOnDestroy() {
    this.stockSub.unsubscribe();
  }

  onStockEntered(symbol: string) {
    this.stockSearchService
      .findStockHistoryBySymbol(symbol)
      .subscribe((stocks: StockEntry[]) => this.history = stocks);
  }

  get todaysPrice() {
    if (!this.stock) {
      return 0;
    }
    return this.stock.price;
  }

  get yesterdaysPrice() {
    if (!this.history || !this.history.length) {
      return 0;
    }
    return this.history[1].close;
  }

  get diff() {
    return this.todaysPrice - this.yesterdaysPrice;
  }

  get absDiff() {
    return Math.abs(this.diff);
  }

  get shouldBuy() {
    return this.todaysPrice > this.yesterdaysPrice;
  }

  get shouldSell() {
    return this.todaysPrice < this.yesterdaysPrice;
  }

  get shouldHold() {
    return this.diff === 0;
  }
}
