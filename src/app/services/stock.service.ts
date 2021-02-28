import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import io from 'socket.io-client';

import { environment } from '../../environments/environment';
import { StockApiData } from '../modals/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  socket;
  constructor(private http: HttpClient) {
    this.socket = io(environment.serverURL, { transports: ['websocket'] });
  }

  getAllStockes(page = 1) {
    return this.http.get<StockApiData>(`${environment.serverURL}/${page}`);
  }
}
