import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Criteria } from '../entities/criteria';
import { StockDetail } from '../entities/stock-detail';
import { StockResponse } from '../entities/stock-response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockService {
 

  constructor(private httpClient: HttpClient) { }

  public getStockList(): Observable<StockResponse> {

    console.log("getStockList...");
    return this.httpClient.get<StockResponse>(environment.apiBaseUrl + '/get-stocks-details');
  }

  public getFilterStockNameByQuery(name: string): Observable<StockDetail[]> {
    return this.getStockList().pipe(map(
      (response: StockResponse) => {
        return this.matchStockName(name, response.stockDetailList);
      })
    );
  }

  public matchStockName(name: string, stockDetail: StockDetail[]): StockDetail[] {
    return stockDetail.filter((stockDetail: StockDetail) => {
      if (!name && stockDetail.stockName.toUpperCase().indexOf(name.toUpperCase()) > -1)
        return true;
      else return false;
    });
  }

  public getStockByFilter(criteria: Criteria): Observable<StockResponse> {
    return this.httpClient.post<StockResponse>(environment.apiBaseUrl + '/get-stock-by-filter', criteria);
  }

  public searchStockNameByQuery(criteria: Criteria):Observable<StockResponse>{
    return this.httpClient.post<StockResponse>(environment.apiBaseUrl + '/get-stock-name-by-symbol', criteria);
  }

  public addNewStockDetails(criteria: Criteria): Observable<StockResponse>{
    return this.httpClient.post<StockResponse>(environment.apiBaseUrl + '/add-new-stock-details', criteria);
  }

  public refreshStockPrice(): Observable<StockResponse>{
    return this.httpClient.get<StockResponse>(environment.apiBaseUrl + '/refresh-Stock-Price');
  }



  public addNewStockPurchaseDetails(criteria: Criteria):Observable<StockResponse>{
    return this.httpClient.post<StockResponse>(environment.apiBaseUrl + '/add-new-stock-purchase-details', criteria);
  }

  public getStockListOwnedByUser(criteria: Criteria):Observable<StockResponse>{
    return this.httpClient.post<StockResponse>(environment.apiBaseUrl + '/get-stock-list-owned-by-user', criteria);
  }

  deleteInvestmentRecord(criteria: Criteria) {
    return this.httpClient.post<StockResponse>(environment.apiBaseUrl + '/delete-investment-record', criteria);
  }

  deleteStockRecord(criteria: Criteria) {
    return this.httpClient.post<StockResponse>(environment.apiBaseUrl + '/delete-stock-record', criteria);
  }
}
