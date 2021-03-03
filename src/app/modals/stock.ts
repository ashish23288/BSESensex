export class Stock {
  open: number;
  close: number;
  date: Date;
  _id?: string;
}

export class StockApiData {
  totalItems: number;
  records: Stock[];
  totalPages: number;
  currentPage: number;
}
