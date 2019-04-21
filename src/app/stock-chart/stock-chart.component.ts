import { Component, OnInit, Input } from '@angular/core';
import { Stock } from '../models/models';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})
export class StockChartComponent implements OnInit {
  @Input() stock: Stock;
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
