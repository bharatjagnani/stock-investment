import { StockDetail } from "./stock-detail";
import { Users } from "./users";

export class StockPurchase{

    id!: number;
    user!: Users;
    stockDetail!:StockDetail;
    stockRate!:number;
    stockQty!:number;
    invest!: number;
    stockDate!:string;
    stockAction!: string;
    createTimeStamp!: string;
    updateTimeStamp!: string;


    constirctor(){}
}