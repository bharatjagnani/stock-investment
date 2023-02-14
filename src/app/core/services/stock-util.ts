import { Injectable } from "@angular/core";
import * as moment from 'moment';
import { Moment } from 'moment';

@Injectable()
export class StockUtil {

    constructor(){}

    public formatDateToYYYYMMDDHHMMSSFormat(tDate: Date | Moment): string{
        return moment(tDate).format('YYYY-MM-DD hh:mm:ss');
      }

      public formatDateToYYYYMMDDFormat(tDate: Date | Moment): string{
        return moment(tDate).format('YYYY-MM-DD');
      }

}