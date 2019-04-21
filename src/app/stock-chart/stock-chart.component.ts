import { Component, OnInit, Input } from '@angular/core';
import { Stock, StockEntry } from '../models/models';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})
export class StockChartComponent implements OnInit {
  @Input() stock: Stock;
  @Input() data: StockEntry[];

  Highcharts = Highcharts;
  chartOptions;

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    if (!this.stock || !this.data) {
      this.chartOptions = undefined;
      return;
    }

    const cats = [];
    const vals = [];
    this.data.forEach(_ => {
        cats.unshift(moment(_.date, 'YYYY-MM-DD').format('MMM D'));
        vals.unshift(_.close);
    });

    this.chartOptions = {
      title: {
          text: this.stock.name
      },
      yAxis: {
          title: {
              text: 'Price'
          }
      },
      xAxis: {
          categories: cats
      },
      series: [{
          name: this.stock.symbol,
          data: vals
      }],
      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              }
          }]
      }
  }
  }
}
