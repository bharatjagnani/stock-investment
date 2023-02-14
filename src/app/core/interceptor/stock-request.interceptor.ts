import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Users } from '../entities/users';
import { Router } from '@angular/router';

@Injectable()
export class StockRequestInterceptor implements HttpInterceptor {
user= new Users();
  constructor(private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
console.log('here I am ......');
    let httpHeaders = new HttpHeaders();
    if(sessionStorage.getItem('userList')){
    this.user = JSON.parse(sessionStorage.getItem('userList') || '{}');
    }
    let authorization = sessionStorage.getItem('Authorization');
    console.log("Authorization:"+authorization)
    if(authorization){
      httpHeaders= httpHeaders.append('Authorization', authorization);
    }
   else if(this.user && this.user.userName && this.user.password){
      httpHeaders = httpHeaders.append('Authorization', 'Basic ' + btoa(this.user.userName + ':' + this.user.password))
    }
    

    
    httpHeaders= httpHeaders.append('X-Requested-With', 'XMLHttpRequest');
    const xhr = request.clone({
      headers: httpHeaders
    });
    console.log(xhr);
    return next.handle(xhr).pipe(tap(() => {},
    (err:any) => {
      console.log(err);
      if(err instanceof HttpErrorResponse){
        if(err.status !==401){
          return;
        }
        this.router.navigate(['home/login']);
      }
    }
    ));
  }
}
