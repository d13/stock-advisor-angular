import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StockSearchComponent } from './stock-search/stock-search.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';
import { StockHeaderComponent } from './stock-header/stock-header.component';
import { StockReportComponent } from './stock-report/stock-report.component';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartComponent } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    StockSearchComponent,
    StockChartComponent,
    StockHeaderComponent,
    StockReportComponent,
    HighchartsChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
