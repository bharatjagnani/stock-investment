import { Component, OnInit } from '@angular/core';
import { LoadingPageService } from '../../services/loading-page.service';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss']
})
export class LoadingPageComponent implements OnInit {

  displayLoading!: boolean;

  constructor(private loadingPageService : LoadingPageService) { 
    console.log(" this.displayLoading"+ this.displayLoading);
    this.displayLoading= false;
    this.loadingPageService.loadingListner.subscribe((value) => {
      this.displayLoading = value;
    });

  }

  ngOnInit(): void {
  }


}
