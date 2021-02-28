import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import io from 'socket.io-client';
import { Stock } from './modals/stock';
import { StockService } from './services/stock.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  socket;
  title = 'BseSensex';
  stockData: Stock[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  paginationArr: number[] = [];

  constructor(private readonly stockService: StockService, private modalService: NgbModal) { }

  ngOnInit() {
    this.socket = io(environment.serverURL, { transports: ['websocket'] });
    this.socket.on('receive_message', (data) => {
      this.getAllStockes(1);
    });
    this.getAllStockes(1);
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    // .result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

  getAllStockes(page: number) {
    this.socket.emit('paginate');
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
