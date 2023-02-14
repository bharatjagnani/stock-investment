import { Component, Input, OnInit } from '@angular/core';
import { StockAnalytics } from 'src/app/core/entities/stock-analytics';
import { StockPurchase } from 'src/app/core/entities/stock-purchase';
import { StockResponse } from 'src/app/core/entities/stock-response';
import { Users } from 'src/app/core/entities/users';

@Component({
  selector: 'app-stock-analysis',
  templateUrl: './stock-analysis.component.html',
  styleUrls: ['./stock-analysis.component.scss']
})
export class StockAnalysisComponent implements OnInit {

  display = false;
  stockAnalyticsDetails!: StockAnalytics[];
  @Input() stockResponse !: StockResponse;
  stockPurchaseDetails!: StockPurchase[];
  @Input() userName!: string;
  stockRowSpan!: Map<String, number>;
  userDropDown = false;
  users!: Users[];
  selectedUser!: Users;
  constructor() { }

  ngOnInit(): void {
    if (sessionStorage.getItem('userRole') === 'admin') {
      this.userDropDown = true;
    }
    console.log("userDropDown " + this.userDropDown);
  }

  showstockInvestmentAnalysisTemplate() {

    this.display = true;
    this.stockAnalyticsDetails = [];
    this.stockRowSpan = new Map<String, number>();
    this.users = this.stockResponse.userList;
    this.selectedUser = this.selectedUser != null ? this.selectedUser : this.users[0];

    this.stockPurchaseDetails = this.selectedUser != null ? this.stockResponse.stockPurchaseList.filter(spl => spl.user.userName === this.selectedUser.userName) : this.stockResponse.stockPurchaseList;

    this.stockPurchaseDetails.forEach(spd => {
      var index = this.stockAnalyticsDetails.findIndex(sa => (sa.stockName == spd.stockDetail.stockName && sa.stockAction == spd.stockAction));
      if (index === -1) {
        this.pushStockAnalysis(spd);
      } else {
        this.updateStockAnaysis(index, spd);
      }

    });
    this.stockAnalyticsDetails.forEach(sad => {
      sad.stockAvg = sad.stockAvg / sad.stockQuantity;
      sad.netPL = sad.netPL - sad.stockValue;
    });
    this.stockAnalyticsDetails.sort((a, b) => a.stockName.localeCompare(b.stockName));
    console.log(this.stockRowSpan);
  }

  pushStockAnalysis(spd: StockPurchase) {

    this.stockAnalyticsDetails.push({
      stockName: spd.stockDetail.stockName,
      stockQuantity: spd.stockQty,
      stockAction: spd.stockAction,
      stockAvg: (spd.stockRate * spd.stockQty),
      stockValue: (spd.stockRate * spd.stockQty),
      netPL: (spd.stockDetail.stockCurRate * spd.stockQty),
      stockRow: spd.stockAction == 'Purchased' ? 1 : 2

    });
    if (spd.stockAction == 'Purchased' && !this.stockRowSpan.has(spd.stockDetail.stockName))
      this.stockRowSpan.set(spd.stockDetail.stockName, 1);
    else {
      this.stockRowSpan.set(spd.stockDetail.stockName, 2);
    }
  }

  updateStockAnaysis(index: number, spd: StockPurchase) {
    this.stockAnalyticsDetails[index].stockQuantity += spd.stockQty;
    this.stockAnalyticsDetails[index].stockAvg += (spd.stockRate * spd.stockQty);
    this.stockAnalyticsDetails[index].stockValue += (spd.stockRate * spd.stockQty);
    this.stockAnalyticsDetails[index].netPL += (spd.stockDetail.stockCurRate * spd.stockQty);
    this.stockAnalyticsDetails[index].stockRow = spd.stockAction == 'Purchased' ? 1 : 2;
  }

  onUserSelected() {
    this.showstockInvestmentAnalysisTemplate();
  }


}
