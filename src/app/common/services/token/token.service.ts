import { Injectable, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { LoginResponse } from 'src/app/login-manager/models/login-response';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  cookieName = environment.cookieName;
  
  public _subject = new Subject<any>();
  
  constructor(
    private cookieService: CookieService,
  ) { }

  logEvent(event) {
    this._subject.next(event);
  }

  get events$ () {
    return this._subject.asObservable();
  }

  getToken() {
    try {
      if(this.cookieService.check(this.cookieName)){
        let fullData = this.cookieService.get(this.cookieName);
        let loginFromCookie = JSON.parse(fullData);
        if(loginFromCookie) {
          return loginFromCookie.token;
        }
      }
      else return false;
    }
    catch(error) {
      console.error();
      alert('login error')
    }
  }

  getLogin() {
    try {
      if(this.cookieService.check(this.cookieName)){
        let fullData = this.cookieService.get(this.cookieName);
        let loginFromCookie = JSON.parse(fullData);
        if(loginFromCookie) {
          return loginFromCookie.login;
        }
      }
      else return false;
    }
    catch(error) {
      console.error();
      alert('login error')
    }
  }

  getIsAdmin() {
    try {
      if(this.cookieService.check(this.cookieName)){
        let fullData = this.cookieService.get(this.cookieName);
        let loginFromCookie = JSON.parse(fullData);
        if(loginFromCookie) {
          if(loginFromCookie.adminCount)
            return loginFromCookie.adminCount;
          else return '0';
        }
      }
      else return false;
    }
    catch(error) {
      console.error();
      alert('login error')
    }
  }

  deleteCookie() {
    if(this.cookieService.check(this.cookieName)){
      this.cookieService.delete(this.cookieName);
      // this.cookieService.delete(this.name,  ' / ' ,  ' localhost');
    }
  }

  isLoginUser() : boolean {
    try {
      if(this.cookieService.check(this.cookieName)) {
        let fullData = this.cookieService.get(this.cookieName);
        let loginFromCookie = JSON.parse(fullData);
        if(loginFromCookie) {
          return true;
        }
      }
      else return false;
    }
    catch(error) {
      console.error();
      alert('login error')
    }
  }

  setCookie(loginResponse: LoginResponse) {
    let loginJson = JSON.stringify(loginResponse);
    this.cookieService.set(this.cookieName, loginJson, 365);
  }
}
