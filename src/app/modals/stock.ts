export class Stock {
  open: number;
  close: number;
  date: Date;
}

export class StockApiData {
  totalItems: number;
  records: Stock[];
  totalPages: number;
  currentPage: number;
}
