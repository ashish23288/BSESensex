import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { environment } from '../../environments/environment';
import { StockApiData } from '../modals/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  getAllStockes(page = 1) {
    return this.http.get<StockApiData>(`${environment.serverURL}/${page}`);
  }

  addStock(data) {
    return this.http.post<{ success?: boolean, warning?: boolean, error?: boolean, message: string }>
      (`${environment.serverURL}/addStock`, data);
  }
}
