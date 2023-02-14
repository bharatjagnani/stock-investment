import { StockDetail } from "./stock-detail";
import { StockPurchase } from "./stock-purchase";
import { Users } from "./users";

export class Criteria{

    stockIdList!:number[];
    stockSearchQuery!: string;
    stockDetailData!: StockDetail;
    userdetails!: Users;
    stockPurchaseData!: StockPurchase;
    username!: string;
    password!: string;
    constructor(){}
}