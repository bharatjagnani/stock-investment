import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockConstants } from 'src/app/core/constants/stock-constants';
import { Criteria } from 'src/app/core/entities/criteria';
import { StockAailable } from 'src/app/core/entities/stock-available';
import { StockDetail } from 'src/app/core/entities/stock-detail';
import { StockPurchase } from 'src/app/core/entities/stock-purchase';
import { StockResponse } from 'src/app/core/entities/stock-response';
import { Users } from 'src/app/core/entities/users';
import { Warning } from 'src/app/core/entities/warning';
import { LoadingPageService } from 'src/app/core/services/loading-page.service';
import { StockUtil } from 'src/app/core/services/stock-util';
import { StockService } from 'src/app/core/services/stock.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-sell-stock-detail',
  templateUrl: './sell-stock-detail.component.html',
  styleUrls: ['./sell-stock-detail.component.scss']
})
export class SellStockDetailComponent implements OnInit {

  display = false;
  users!: Users[];
  selectedUser!: Users;
  stockDetails!: StockDetail[];
  selectedStock!: StockDetail;
  stockQuantity!: number;
  stockDisplay = false;
  stockQuantityDisplay = false;
  availableStockQuantity!: number;
  stockAvailable!: StockAailable[];
  totalPrice!: number;
  selectedStockQuantity!: number;
  selectedStockPrice!: number;
  dateFormat = StockConstants.DATE_FORMAT;
  sellDate!: Date;
  warningMessage!: Warning[];

  constructor(private userService: UserService,
    private stockService: StockService,
    private stockUtil: StockUtil,
    private router: Router,
    private loadingPageService: LoadingPageService) { }

  ngOnInit(): void {
  }

  showSellStockTemplate() {
    this.display = true;
    this.selectedUser = new Users;
    this.selectedStock = new StockDetail;
    this.stockDisplay = true;
    this.stockQuantityDisplay = true;
    this.selectedStockQuantity = 0;
    this.warningMessage = [];
    this.getAllUser();
  }

  getAllUser() {
    const criteria = new Criteria();

    if (sessionStorage.getItem('userName') && !(sessionStorage.getItem('userRole') === 'admin')) {
      criteria.username = sessionStorage.getItem('userName') as any;
    }
    this.userService.getUsers(criteria).subscribe((response: StockResponse) => {
      console.log(response);
      this.users = response.userList;
    });
  }

  onUserSelected() {
    this.stockDisplay = true;
    this.getAllStockOwnedByUser();
  }

  getAllStockOwnedByUser() {
    this.loadingPageService.showPage();
    console.log("this.selectedUser: " + this.selectedUser);
    const criteria: Criteria = new Criteria();
    criteria.userdetails = this.selectedUser;
    this.stockService.getStockListOwnedByUser(criteria).subscribe((response: StockResponse) => {
      this.loadingPageService.hidePage();
      this.stockDetails = [];
      this.stockAvailable = [];
      response.stockPurchaseList.forEach(sp => {
        var index = this.stockDetails.findIndex(sd => sd.stockId == sp.stockDetail.stockId);
        if (index === -1) {
          console.log(sp.stockDetail);
          this.stockDetails.push(sp.stockDetail);
          this.stockAvailable.push({ stockAvailable: sp.stockQty, stockDetail: sp.stockDetail });
        } else {
          this.stockAvailable[index].stockAvailable = sp.stockAction == 'Purchased' ? this.stockAvailable[index].stockAvailable + sp.stockQty : this.stockAvailable[index].stockAvailable - sp.stockQty;
        }
      });
    })
    console.log("this.stockDetails: " + this.stockDetails);
  }

  onStockSelected() {
    this.stockQuantityDisplay = false;
    var index = this.stockAvailable.findIndex(sa => sa.stockDetail == this.selectedStock);
    this.availableStockQuantity = this.stockAvailable[index].stockAvailable;

  }

  onStockQtyPriceSelected() {
    if (this.selectedStockQuantity && this.selectedStockPrice) {
      this.totalPrice = this.selectedStockQuantity * this.selectedStockPrice;
    }
    if (this.selectedStockQuantity > this.availableStockQuantity) {
      this.warningMessage.push({key:'selldate',
        value:'Selling quanitity should not be more than max value'});      
    }else{
      var index = this.warningMessage.findIndex(wm => wm.key=='selldate');
      this.warningMessage.splice(index,1);
    }
  }

  sellStockDetails() {
    const criteria: Criteria = new Criteria();
    criteria.stockPurchaseData = new StockPurchase;

    criteria.stockPurchaseData.stockDetail = this.selectedStock;
    criteria.stockPurchaseData.user = this.selectedUser;
    criteria.stockPurchaseData.stockAction = "Sold";
    criteria.stockPurchaseData.stockDate = this.stockUtil.formatDateToYYYYMMDDFormat(this.sellDate);
    criteria.stockPurchaseData.stockQty = this.selectedStockQuantity;
    criteria.stockPurchaseData.stockRate = this.selectedStockPrice;

    this.stockService.addNewStockPurchaseDetails(criteria).subscribe((response: StockResponse) => {
      this.display = false;
      window.location.reload();
      this.router.navigate(['/home/stock-purchase']);
    });;

  }

}
