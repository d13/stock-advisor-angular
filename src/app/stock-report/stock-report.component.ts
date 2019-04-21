import { Component, OnInit, Input } from '@angular/core';
import { Stock } from '../models/models';

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.scss']
})
export class StockReportComponent implements OnInit {
  @Input() stock: Stock;

  constructor() { }

  ngOnInit() {
  }

}
