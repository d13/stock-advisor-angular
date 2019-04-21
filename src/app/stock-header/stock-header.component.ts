import { Component, OnInit, Input } from '@angular/core';
import { Stock } from '../models/models';

@Component({
  selector: 'app-stock-header',
  templateUrl: './stock-header.component.html',
  styleUrls: ['./stock-header.component.scss']
})
export class StockHeaderComponent implements OnInit {
  @Input() stock: Stock;

  constructor() { }

  ngOnInit() {
  }

}
