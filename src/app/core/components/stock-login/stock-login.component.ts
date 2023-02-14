import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Criteria } from 'src/app/core/entities/criteria';
import { Users } from 'src/app/core/entities/users';
import { StockAuthService } from 'src/app/core/services/stock-auth.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-stock-login',
  templateUrl: './stock-login.component.html',
  styleUrls: ['./stock-login.component.scss']
})
export class StockLoginComponent implements OnInit {


  username!: string;
  password!: string;
  returnUrl!: string;


  constructor(private userAuthService : StockAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private navigationService: NavigationService) { 
      sessionStorage.clear();
      this.navigationService.hideNav();
    }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returUrl'] || '/';
  }

  Userlogin(){
    const criteria= new Criteria(); 
    criteria.username = this.username;
    criteria.password = this.password;

    const users = new Users();

    users.userName = this.username;
    users.password = this.password;
    criteria.userdetails = users;

    this.userAuthService.userLogin(criteria).subscribe((user: Users) => {
      console.log(user);
      if(user != null){
        console.log(this.returnUrl)
      this.router.navigate([this.returnUrl]);
      }else{
        console.log('user is not authenticate');
        this.router.navigate(['/home/access-denied']);
      }
      
    });
  }

}
