import { Component, OnInit } from '@angular/core';
import { Criteria } from 'src/app/core/entities/criteria';
import { StockDetail } from 'src/app/core/entities/stock-detail';
import { StockResponse } from 'src/app/core/entities/stock-response';
import { StockService } from 'src/app/core/services/stock.service';
import * as moment from 'moment';
import { Moment } from 'moment';
import { StockUtil } from 'src/app/core/services/stock-util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {

  stockDetails!: StockDetail[];
  stockDetailsFilterValue!: StockDetail[];
  stockDetailsFilter!: StockDetail[];
  constructor(private stockService: StockService,
    private stockUtil: StockUtil,
    private router: Router) { }

  ngOnInit(): void {
    console.log("StockListComponent ngOnInit call");
    this.getStockDetails();
  }

  convertDateStringToYYYYMMDDFormat = (dateStr: string) => this.stockUtil.formatDateToYYYYMMDDHHMMSSFormat(this.formatRestStringToDate(dateStr));

   formatRestStringToDate(dateStr: string):Date{
    let tDate = moment(dateStr, 'YYYY-MM-DDThh:mm:ss').toDate();
    if(String(tDate)=== 'Invalid Date'){
      console.error('Invalid date format', tDate);
    }
    return tDate;
  }

  getStockDetails() {

    this.stockService.getStockList().subscribe((response: StockResponse) => {
      this.stockDetails = response.stockDetailList;
    })
  }

  filterStockName(event: any) {
    this.stockService.getFilterStockNameByQuery(event.query).subscribe((response: StockDetail[]) => {
      this.stockDetailsFilterValue = response;
    });
  }

  searchStock() {

    const criteria: Criteria = new Criteria();
    criteria.stockIdList = this.stockDetailsFilter.map((data: StockDetail) => data.stockId);
    this.stockService.getStockByFilter(criteria).subscribe((response: StockResponse) => {
      this.stockDetails = response.stockDetailList;
    })
    console.log(this.stockDetails);
  }

  deleteRecord(rowdata : StockDetail){
    console.log( rowdata);
    const criteria: Criteria = new Criteria();
    criteria.stockDetailData = rowdata;

    this.stockService.deleteStockRecord(criteria).subscribe((response: StockResponse) => {
      window.location.reload();
      this.router.navigate(['home/stock-list']);
    });
  }

}
