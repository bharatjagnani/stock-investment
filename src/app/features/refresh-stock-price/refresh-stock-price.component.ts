import { Component, OnInit } from '@angular/core';
import { StockResponse } from 'src/app/core/entities/stock-response';
import { LoadingPageService } from 'src/app/core/services/loading-page.service';
import { StockService } from 'src/app/core/services/stock.service';

@Component({
  selector: 'app-refresh-stock-price',
  templateUrl: './refresh-stock-price.component.html',
  styleUrls: ['./refresh-stock-price.component.scss']
})
export class RefreshStockPriceComponent implements OnInit {


  display=true;
  stockCount!: number;
  estimatedTime!: number;
  lastUpdated!: string;
  constructor(private stockService: StockService,
    private loadingPageService: LoadingPageService) { }

  ngOnInit(): void {
   this.getStockCount();
  }

getStockCount(){
  this.stockService.getStockList().subscribe((response: StockResponse) => {
   this.stockCount= response.stockDetailList.length;
   response.stockDetailList.sort((a,b) => a.updateTimeStamp.localeCompare(b.updateTimeStamp));
   this.lastUpdated = response.stockDetailList[response.stockDetailList.length-1].updateTimeStamp;
   console.log(this.stockCount/5);
   this.estimatedTime = Math.floor(this.stockCount/5);
  });
}

  refreshStockPrice(){
    this.loadingPageService.showPage();
    this.display=false;
    this.stockService.refreshStockPrice().subscribe((response:StockResponse)=> {
      this.loadingPageService.hidePage();
      this.display=true;
      this.getStockCount();
    });


  }

}
