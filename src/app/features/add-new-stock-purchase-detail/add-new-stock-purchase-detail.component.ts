import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockConstants } from 'src/app/core/constants/stock-constants';
import { Criteria } from 'src/app/core/entities/criteria';
import { StockDetail } from 'src/app/core/entities/stock-detail';
import { StockPurchase } from 'src/app/core/entities/stock-purchase';
import { StockResponse } from 'src/app/core/entities/stock-response';
import { Users } from 'src/app/core/entities/users';
import { StockUtil } from 'src/app/core/services/stock-util';
import { StockService } from 'src/app/core/services/stock.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-new-stock-purchase-detail',
  templateUrl: './add-new-stock-purchase-detail.component.html',
  styleUrls: ['./add-new-stock-purchase-detail.component.scss']
})
export class AddNewStockPurchaseDetailComponent implements OnInit {

  display= false;
  users!: Users[];
  selectedUser!:Users;
  stockDetails!: StockDetail[];
  selectedStock!:StockDetail;
  stockQuantity!: number;
  stockPurchaseRate!: number;
  purchaseDate!: Date;
  purchaseDateStringFormat!: string;
  dateFormat = StockConstants.DATE_FORMAT;
  action!: string;
  

  constructor(private userService: UserService,
    private stockService: StockService,
    private stockUtil : StockUtil,
    private router: Router) { }

  ngOnInit(): void {
    
    
  }


  getAllUser(){
    const criteria = new Criteria();

      if(sessionStorage.getItem('userName') && !(sessionStorage.getItem('userRole')==='admin')){
        criteria.username =sessionStorage.getItem('userName') as any;
      }
    this.userService.getUsers(criteria).subscribe((response : StockResponse) => {
      console.log(response);
      this.users= response.userList;
    });   

  }

  getAllStock(){
    this.stockService.getStockList().subscribe((response: StockResponse) => {
      this.stockDetails = response.stockDetailList;
    })
  }
  showNewStockPurchaseDetailTemplate(){
    this.display= true;
    this.getAllUser();
    this.getAllStock();
  }

  addNewStockPurchaseDetails(){

    const criteria: Criteria = new Criteria();
    criteria.stockPurchaseData = new StockPurchase;

    criteria.stockPurchaseData.stockDetail = this.selectedStock;
    criteria.stockPurchaseData.user = this.selectedUser;
     criteria.stockPurchaseData.stockAction ="Purchased";
     criteria.stockPurchaseData.stockDate = this.stockUtil.formatDateToYYYYMMDDFormat(this.purchaseDate);
     criteria.stockPurchaseData.stockQty = this.stockQuantity;
     criteria.stockPurchaseData.stockRate = this.stockPurchaseRate;
     
     this.stockService.addNewStockPurchaseDetails(criteria).subscribe((response: StockResponse) => {
      this.display=false;
      window.location.reload();
      this.router.navigate(['/home/stock-purchase']);
    });;

  }


}
