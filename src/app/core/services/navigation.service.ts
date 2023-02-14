import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private _loadingNavigation: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get loadingNavigation(){
    return this._loadingNavigation;
      }
 
  public hideNav(){
this._loadingNavigation.next(false);
  }
  public showNav(){
    console.log("showPage");
    this._loadingNavigation.next(true);
      }


  constructor() { }
}
