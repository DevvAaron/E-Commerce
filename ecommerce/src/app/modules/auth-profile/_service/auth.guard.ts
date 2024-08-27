import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authservice: AuthService,
    public router: Router,
  ){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.authservice.user || !this.authservice.token) {
        this.router.navigate(["auth/login"]);
        return false;
      }
    
    let token = this.authservice.token;
    let expiration = (JSON.parse(atob(token.split('.')[1]))).exp;
    if (Math.floor((new Date).getTime() / 1000) >= expiration) {
      this.authservice.logout();
      return false;
    }
      return true;
  }
  
}
