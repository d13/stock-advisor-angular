import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Stock } from '../models/models';
import { StockSearchService } from '../stock-search.service';

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.scss']
})
export class StockSearchComponent implements OnInit {
  @Output() onSelectionChange: EventEmitter<Stock> = new EventEmitter();
  @ViewChild('searchInput') input: ElementRef;
  @Input() value: string = '';
  inputSub: Subscription;
  searching: boolean = false;
  assisting: boolean = false;
  validStock: Stock;
  results: Stock[] = [];

  constructor(private stockSearchService: StockSearchService) { }

  ngOnInit() {
    this.input.nativeElement.focus();
    this.inputSub = fromEvent(this.input.nativeElement, 'input')
      .pipe(
        map((event: Event) => (<HTMLInputElement>event.target).value),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(data => {
        this.onSearchEntry(data);
      });
  }
  ngOnDestroy() {
    this.inputSub.unsubscribe();
  }

  onSelectHint(stock: Stock) {
    this.assisting = false;
    this.value = stock.symbol;
    this.validStock = stock;
    this.results = [];
    this.onSelectionChange.emit(stock);
  }

  onSearchEntry(val: any) {
    console.log(val);
    if (!val) {
      this.value = '';
      this.assisting = false;
      this.searching = false;
      this.validStock = undefined;
      this.results = [];
      this.onSelectionChange.emit();
    }

    this.value = val;
    this.assisting = true;
    this.searching = true;

    this.stockSearchService
      .findStocksBySymbol(val)
      .subscribe((stocks: Stock[]) => {
        const validStock = stocks.find(_ => val === _.symbol) || undefined;
        this.validStock = validStock;
        this.searching = false;
        this.results = stocks;
        this.onSelectionChange.emit(validStock);
      });
  }
}
