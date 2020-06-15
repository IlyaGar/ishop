import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/common/services/token/token.service';
import { LoginQuery } from '../models/login-query';
import { LoginService } from '../services/login.service';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { LoginResponse } from '../models/login-response';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  isLoginUser = false;
  loginQuery = new LoginQuery("", "");

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  messageFailLogin = 'Вход не разрешен, имя или пароль неверны.';
  messageStatusTrue = 'Ваша сообщение в обработке.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
  }

  onClickLogin() {
    this.loginService.getLogin(this.loginQuery).subscribe(response => {
      if(this.checkResponse(response)) {
        this.tokenService.setCookie(response);
        this.tokenService.logEvent(true);
        this.router.navigate(['/orders/ready-build']);
      }
      else 
        this.snackbarService.openSnackBar(this.messageFailLogin, this.action, this.styleNoConnect);
    },
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  checkResponse(response: LoginResponse) : boolean {
    if(response) 
      if(response.token) 
        if(response.token.length > 0) 
          return true; 
  }
}
