import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StockConstants } from '../../constants/stock-constants';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  display:boolean = false;
  showNav=false;
  userName!: string;
  menuIemsArray!:MenuItem[];
  constructor(private navigationService: NavigationService) { 
    this.menuIemsArray = StockConstants.getMenuItems();
    this.navigationService.loadingNavigation.subscribe((value)=>{
      this.showNav= value;
      this.userName = sessionStorage.getItem('userName') as any;
    })
  }

  ngOnInit(): void {
    
  }

  displayNav(){
    console.log("here");
    this.display= true;
  }

}
