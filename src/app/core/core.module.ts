import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SidebarModule } from "primeng/sidebar";
import { ButtonModule } from "primeng/button";
import { PanelMenuModule } from "primeng/panelmenu";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { StockService } from './services/stock.service';
import {TableModule} from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule }   from '@angular/forms';
import { DividerModule } from "primeng/divider";
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { CalendarModule } from "primeng/calendar";
import { StockUtil } from './services/stock-util';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';



@NgModule({
  declarations: [
    NavigationComponent,
    AccessDeniedComponent,
    LoadingPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SidebarModule,
    ButtonModule,
    PanelMenuModule,
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    DropdownModule,
    AutoCompleteModule,
    FormsModule,
    DividerModule,
    DialogModule,
    RouterModule,
    CalendarModule
  ],
  providers: [
    UserService,
    StockService,
    StockUtil
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    SidebarModule,
    ButtonModule,
    PanelMenuModule,
    BrowserModule,
    BrowserAnimationsModule,
    NavigationComponent,
    LoadingPageComponent,
    TableModule,
    DropdownModule,
    AutoCompleteModule,
    FormsModule,
    DividerModule,
    DialogModule,
    RouterModule,
    CalendarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class CoreModule {}
