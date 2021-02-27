import { Component, OnInit } from '@angular/core';
import { Stock } from './modals/stock';
import { StockService } from './services/stock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BseSensex';
  stockData: Stock[] = [];

  constructor(private readonly stockService: StockService) { }

  ngOnInit() {
    this.getAllStockes(1);
  }

  getAllStockes(page: number) {
    this.stockService.getAllStockes(page).subscribe((data) => {
      this.stockData = data;
    });
  }
}
