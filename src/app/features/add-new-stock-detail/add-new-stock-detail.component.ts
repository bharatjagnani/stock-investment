import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockConstants } from 'src/app/core/constants/stock-constants';
import { Criteria } from 'src/app/core/entities/criteria';
import { StockDetail } from 'src/app/core/entities/stock-detail';
import { StockResponse } from 'src/app/core/entities/stock-response';
import { LoadingPageService } from 'src/app/core/services/loading-page.service';
import { StockService } from 'src/app/core/services/stock.service';

@Component({
  selector: 'app-add-new-stock-detail',
  templateUrl: './add-new-stock-detail.component.html',
  styleUrls: ['./add-new-stock-detail.component.scss']
})
export class AddNewStockDetailComponent implements OnInit {


  display = false;
  stockDetailSuggestion!:StockDetail[];
  stockDetailFilter!:StockDetail;
  SECTORS= StockConstants.SECTORS;
  selectedSector!: string;

  constructor(private stockService: StockService,
    private router: Router,
    private loadingPageService: LoadingPageService) { }

  ngOnInit(): void {
  }

  showNewStockDetailTemplate(){
    this.display=true;
    this.stockDetailFilter= new StockDetail;
  }

  searchStockNameByQuery(event: any){
    console.log("event.query: "+event.query);
    const criteria: Criteria = new Criteria();
    criteria.stockSearchQuery = event.query;
     this.stockService.searchStockNameByQuery(criteria).subscribe((response: StockResponse) => {
       console.log(response);
      this.stockDetailSuggestion = response.stockDetailList;
    })

    }

    addNewStockDetails(){
      this.loadingPageService.showPage();
    const criteria: Criteria = new Criteria();
    criteria.stockDetailData = this.stockDetailFilter;
    criteria.stockDetailData.stockSector = this.selectedSector;
    console.log(criteria);
    this.stockService.addNewStockDetails(criteria).subscribe((response: StockResponse) => {
      this.loadingPageService.showPage();
      this.display=false;
      window.location.reload();
      this.router.navigate(['/home/stock-list']);
    });

  }

}
