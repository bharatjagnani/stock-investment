import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Criteria } from 'src/app/core/entities/criteria';
import { StockResponse } from 'src/app/core/entities/stock-response';
import { Users } from 'src/app/core/entities/users';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


   users!:Users[];

  constructor( private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }



  public getUsers(){
    console.log("under getUsers method....");
    const criteria = new Criteria();

      if(sessionStorage.getItem('userName') && !(sessionStorage.getItem('userRole')==='admin')){
        criteria.username =sessionStorage.getItem('userName') as any;
      }

    this.userService.getUsers(criteria).subscribe((response : StockResponse) => {
      console.log(response);
      this.users= response.userList;
    });   
  }

  deleteRecord(rowdata : Users){
    console.log( rowdata);
    const criteria: Criteria = new Criteria();
    criteria.userdetails = rowdata;

    this.userService.deleteUserRecord(criteria).subscribe((response: StockResponse) => {
      window.location.reload();
      this.router.navigate(['/home/user-detail']);
    });
  }

}
