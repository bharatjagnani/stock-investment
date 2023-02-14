import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Criteria } from 'src/app/core/entities/criteria';
import { StockInvestmentDetail } from 'src/app/core/entities/stock-investment-detail';
import { StockPurchase } from 'src/app/core/entities/stock-purchase';
import { StockResponse } from 'src/app/core/entities/stock-response';
import { Users } from 'src/app/core/entities/users';
import { LoadingPageService } from 'src/app/core/services/loading-page.service';
import { StockService } from 'src/app/core/services/stock.service';

@Component({
  selector: 'app-stock-purchase',
  templateUrl: './stock-purchase.component.html',
  styleUrls: ['./stock-purchase.component.scss']
})
export class StockPurchaseComponent implements OnInit {

  userId!: number;
  userName!: string;
  stockPurchaseDetails!: StockPurchase[];
  stockInvestmentDetail!: StockInvestmentDetail[];
  currentInvestment: number=0;
  current: number = 0;
  profitLoss!: number;
  stockResponse!: StockResponse;

  constructor(private stockService: StockService,
    private route: ActivatedRoute,
    private router : Router,
    private loadingPageService: LoadingPageService) { }

  ngOnInit(): void {


    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.has('userId')) {
        this.userId = params.get('userId') as any;

      }

    });
    this.getPurchaseDetails();
  }

  getPurchaseDetails() {
    this.loadingPageService.showPage();
    const criteria: Criteria = new Criteria();
    if(this.userId){
      criteria.userdetails = new Users();
      criteria.userdetails.userId = this.userId;
    }
    if(!this.userId && sessionStorage.getItem('userName') && !(sessionStorage.getItem('userRole')==='admin')){
      criteria.userdetails = new Users();
      criteria.userdetails.userName = sessionStorage.getItem('userName') as any;
    }
    this.stockService.getStockListOwnedByUser(criteria).subscribe((response: StockResponse) => {
      this.loadingPageService.hidePage();
      this.stockResponse = response;
      this.stockPurchaseDetails = response.stockPurchaseList;
      this.stockInvestmentDetail = [];
      this.stockPurchaseDetails.forEach(sp => {
        console.log(sp.stockDetail.stockId);
        var index = this.stockInvestmentDetail.findIndex(sid => sid.stockId == sp.stockDetail.stockId);
        if(sp.stockAction.toUpperCase() =="PURCHASED"){
          
          if(index === -1){
            this.stockInvestmentDetail.push({stockId: sp.stockDetail.stockId, stockInvest: sp.stockRate * sp.stockQty, stockQty: sp.stockQty});
          }else{
            this.stockInvestmentDetail[index].stockQty = this.stockInvestmentDetail[index].stockQty + sp.stockQty;
            this.stockInvestmentDetail[index].stockInvest = this.stockInvestmentDetail[index].stockInvest + (sp.stockRate * sp.stockQty);
          }
        this.currentInvestment = this.currentInvestment + (sp.stockRate * sp.stockQty);
        this.current = this.current + (sp.stockDetail.stockCurRate * sp.stockQty);
        }else{
          this.currentInvestment = this.currentInvestment - 
          ((this.stockInvestmentDetail[index].stockInvest/this.stockInvestmentDetail[index].stockQty) * sp.stockQty);
          this.current = this.current - (sp.stockDetail.stockCurRate * sp.stockQty);
        }

        if(this.userId){
          this.userName  = sp.user.userName;
        }else if(sessionStorage.getItem('userName') && !(sessionStorage.getItem('userRole')==='admin')){
          this.userName = sessionStorage.getItem('userName') as any;
        }else{
          this.userName = 'ALL';
        }

      });
      this.profitLoss = this.current - this.currentInvestment;
    });
    
  }

  deleteRecord(rowdata : StockPurchase){
    console.log( rowdata);
    const criteria: Criteria = new Criteria();
    criteria.stockPurchaseData = rowdata;

    this.stockService.deleteInvestmentRecord(criteria).subscribe((response: StockResponse) => {
      window.location.reload();
      this.router.navigate(['/home/stock-purchase']);
    });
  }

}
