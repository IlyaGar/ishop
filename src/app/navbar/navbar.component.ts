import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../common/services/token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoginUser = false;
  userName = '';

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { 
    this.tokenService.events$.forEach(value => { this.eventLogin(value) } );
  }

  ngOnInit(): void {
    if(this.tokenService.isLoginUser()) {
      this.isLoginUser = true;
      this.userName = this.tokenService.getLogin();
      // this.router.navigate(['/orders']);
    } 
    else {
      this.isLoginUser = false;
      this.router.navigate(['/login']);
    }
  }

  eventLogin(event: boolean) {
    if(event === true)
      this.isLoginUser = event;
    else {
      this.isLoginUser = event;
      this.router.navigate(['/login']);
    }
  }

  onClickLogout() {
    this.tokenService.deleteCookie();
    this.isLoginUser = false;
    this.router.navigate(['/login']);
  }
}
