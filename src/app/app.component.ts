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
  stockData: Stock[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  paginationArr: number[] = [];

  constructor(private readonly stockService: StockService) { }

  ngOnInit() {
    this.getAllStockes(1);
  }

  getAllStockes(page: number) {
    this.stockService.getAllStockes(page).subscribe((data) => {
      this.stockData = data.records;
      this.totalItems = data.totalItems;
      this.totalPages = data.totalPages;
      this.currentPage = data.currentPage;
      this.paginationArr = Array.from(Array(this.totalPages).keys()).map((val) => val + 1);
      console.log('this.paginationArr', this.paginationArr);

    });
  }
}
