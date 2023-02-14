import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StockAuthGuard } from './core/services/stock-auth.guard';
import { RefreshStockPriceComponent } from './features/refresh-stock-price/refresh-stock-price.component';
import { StockListComponent } from './features/stock-list/stock-list.component';
import { StockLoginComponent } from './core/components/stock-login/stock-login.component';
import { StockPurchaseComponent } from './features/stock-purchase/stock-purchase.component';
import { UserComponent } from './features/user/user.component';
import { AccessDeniedComponent } from './core/components/access-denied/access-denied.component';

const routes: Routes = [
  
      {
        path:'', component:RefreshStockPriceComponent , canActivate: [StockAuthGuard]
      },
      {
        path: 'home/login', component:StockLoginComponent
      },
      {
        path: 'home/refresh-stock-price', component:RefreshStockPriceComponent , canActivate: [StockAuthGuard]
      },
      {
        path: 'home/user-detail', component: UserComponent , canActivate: [StockAuthGuard]
      },
      {
        path: 'home/stock-list', component: StockListComponent , canActivate: [StockAuthGuard]
      },
      {
        path: 'home/stock-purchase', component: StockPurchaseComponent , canActivate: [StockAuthGuard]
      },
      {
        path: 'home/access-denied', component: AccessDeniedComponent
      },
      
      {
        path: '**', component: StockLoginComponent
      }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
