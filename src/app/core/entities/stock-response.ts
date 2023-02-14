import { DailyStockPrice } from "./daily-stock-price";
import { ErrorDetail } from "./error-deail";
import { StockDetail } from "./stock-detail";
import { StockPurchase } from "./stock-purchase";
import { Users } from "./users";

export class StockResponse{

    userList!:Users[];
    stockDetailList!:StockDetail[];
    stockPurchaseList!:StockPurchase[];
    dailyStockPriceList!:DailyStockPrice[];
    errorDetail!: ErrorDetail;
    
    constructor(){}
}