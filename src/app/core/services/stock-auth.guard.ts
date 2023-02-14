import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavigationService } from './navigation.service';

import { StockAuthService } from './stock-auth.service';

@Injectable({
  providedIn: 'root'
})
export class StockAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private stockAuthService: StockAuthService,
    private navigationService: NavigationService
) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      console.log("in can activate"+this.stockAuthService.userValue());
      if(this.stockAuthService.userValue()){
        this.navigationService.showNav();
        return true;
      }else{
        this.router.navigate(['/home/login'],{queryParams: {requestUrl: state.url}});
      }
    return true;
  }
  
}
