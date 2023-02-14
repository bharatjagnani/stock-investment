import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../entities/users';
import { StockResponse } from '../entities/stock-response';
import { Criteria } from '../entities/criteria';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }

  public getUsers(criteria : Criteria):Observable<StockResponse>{

    console.log("getUsers...");

    return this.httpClient.post<StockResponse>(environment.apiBaseUrl + '/get-user-details' , criteria)

  }

  public addNewUserDetails(criteria: Criteria):Observable<StockResponse>{
    return this.httpClient.post<StockResponse>(environment.apiBaseUrl + '/add-new-user-details' , criteria);
  }

  public deleteUserRecord(criteria: Criteria) {
    return this.httpClient.post<StockResponse>(environment.apiBaseUrl + '/delete-user-record', criteria);
  }
}
