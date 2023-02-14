import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingPageService {
  private _loadingListner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get loadingListner(){
return this._loadingListner;
  }
  public hidePage(){
this._loadingListner.next(false);
  }
  public showPage(){
    console.log("showPage");
    this._loadingListner.next(true);
      }

  constructor() { }
}
