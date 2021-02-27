import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Stock } from '../modals/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  getAllStockes(page = 1) {
    return this.http.get<Stock[]>(`${environment.serverURL}/${page}`);
  }
}
