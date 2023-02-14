import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './features/user/user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StockListComponent } from './features/stock-list/stock-list.component';
import { AddNewStockDetailComponent } from './features/add-new-stock-detail/add-new-stock-detail.component';
import { RefreshStockPriceComponent } from './features/refresh-stock-price/refresh-stock-price.component';
import { AddNewUserComponent } from './features/add-new-user/add-new-user.component';
import { StockPurchaseComponent } from './features/stock-purchase/stock-purchase.component';
import { AddNewStockPurchaseDetailComponent } from './features/add-new-stock-purchase-detail/add-new-stock-purchase-detail.component';
import { SellStockDetailComponent } from './features/sell-stock-detail/sell-stock-detail.component';
import { StockAnalysisComponent } from './features/stock-analysis/stock-analysis.component';
import { StockLoginComponent } from './core/components/stock-login/stock-login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StockRequestInterceptor } from './core/interceptor/stock-request.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    StockListComponent,
    AddNewStockDetailComponent,
    RefreshStockPriceComponent,
    AddNewUserComponent,
    StockPurchaseComponent,
    AddNewStockPurchaseDetailComponent,
    SellStockDetailComponent,
    StockAnalysisComponent,
    StockLoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    NgbModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: StockRequestInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
