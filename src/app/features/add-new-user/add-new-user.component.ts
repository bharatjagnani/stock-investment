import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockConstants } from 'src/app/core/constants/stock-constants';
import { Criteria } from 'src/app/core/entities/criteria';
import { StockResponse } from 'src/app/core/entities/stock-response';
import { Users } from 'src/app/core/entities/users';
import { LoadingPageService } from 'src/app/core/services/loading-page.service';
import { StockUtil } from 'src/app/core/services/stock-util';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {

  display = false;
  userName!: string;
  dateOfBirth!: Date;
  password!: string;
  user!: Users;
  dateOfBirthStringFormat!: string;
  dateFormat = StockConstants.DATE_FORMAT;
  warningMessage!: string;

  constructor(private userService: UserService,
    private stockUtil: StockUtil,
    private router: Router,
    private loadingPageService: LoadingPageService) { }

  ngOnInit(): void {
  }

  showNewUserDetailTemplate() {
    this.display = true;
  }

  addNewUserDetails() {
   this.loadingPageService.showPage();
    const criteria: Criteria = new Criteria();
    this.dateOfBirthStringFormat = this.stockUtil.formatDateToYYYYMMDDFormat(this.dateOfBirth);
    console.log("userName: " + this.userName + " dateOfBirth: " + this.dateOfBirthStringFormat);
    criteria.userdetails = new Users;
    criteria.userdetails.userName = this.userName;
    criteria.userdetails.dateOfBirth = this.dateOfBirthStringFormat;
    criteria.userdetails.password = this.password;
    this.userService.addNewUserDetails(criteria).subscribe((response: StockResponse) => {
      
      if(response.errorDetail!= null){
        this.loadingPageService.hidePage();
          this.warningMessage = response.errorDetail.errorMessage;
      }else{
        this.loadingPageService.hidePage();
        this.display=false;
      window.location.reload();
      this.router.navigate(['/home/user-detail']);
      }
    });

  }

  
  userFormValidation(){

    if(this.userName && this.dateOfBirth && this.password){
      return false;
    }else{
      return true;
    }
  }

}
