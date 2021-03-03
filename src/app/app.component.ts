import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
  openValue: number = null;
  closeValue: number = null;
  editId: string;

  constructor(private readonly stockService: StockService, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {
    this.socket = io(environment.serverURL, { transports: ['websocket'] });
    this.socket.on('receive_message', (data) => {
      this.getAllStockes(1);
    });
    this.getAllStockes(1);
  }

  open(content) {
    this.editId = null;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  openEdit(stock: Stock, content) {
    this.openValue = stock.open;
    this.closeValue = stock.close;
    this.editId = stock._id;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  submit(stockForm) {

    if (this.editId) {
      stockForm._id = this.editId;
      console.log('update', stockForm);
      this.stockService.updateStock(stockForm).subscribe((res) => {
        if (res.success) {
          this.modalService.dismissAll();
          this.toastr.success('Updated Successfully');
        } else if (res.warning) {
          this.toastr.warning('Invalid Values');
        } else {
          this.toastr.error('Failed');
        }
      });
    } else {
      console.log('add', stockForm);
      this.stockService.addStock(stockForm).subscribe((res) => {
        if (res.success) {
          this.modalService.dismissAll();
          this.toastr.success('Added Successfully');
        } else if (res.warning) {
          this.toastr.warning('Invalid Values');
        } else {
          this.toastr.error('Failed');
        }
      });
    }
  }

  getAllStockes(page: number) {
    this.socket.emit('paginate');
    this.stockService.getAllStockes(page).subscribe((data) => {
      this.stockData = data.records;
      this.totalItems = data.totalItems;
      this.totalPages = data.totalPages;
      this.currentPage = data.currentPage;
      this.paginationArr = Array.from(Array(this.totalPages).keys()).map((val) => val + 1);
      window.scroll(0, 0);
    });
  }
}
