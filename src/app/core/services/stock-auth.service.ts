import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Criteria } from '../entities/criteria';
import { StockResponse } from '../entities/stock-response';
import { Users } from '../entities/users';

@Injectable({
  providedIn: 'root'
})
export class StockAuthService {

  user!: Users;
  

  constructor(private http: HttpClient) { }

  userValue(){
    if(sessionStorage.getItem('userName')){
      return true;
    }
    return false;
}

  userLogin(criteria: Criteria) : Observable<Users>{
    sessionStorage.setItem('userList',  JSON.stringify(criteria.userdetails));
    return  this.http.post<any>(environment.apiBaseUrl + '/get-user-authentication' , criteria,{observe: 'response' }).pipe(map(
      (response) => {
        console.log(response);
        if(response.body.userList!= null){
          this.user = response.body.userList[0];
          sessionStorage.setItem('userName', this.user.userName);
          sessionStorage.setItem('userRole', this.user.role);
         // sessionStorage.setItem('userList',  JSON.stringify(this.user));
          sessionStorage.setItem('Authorization',  response.headers.get('Authorization') || '');
          return this.user;
        }
        return this.user;
      }
    ));
  }
}
