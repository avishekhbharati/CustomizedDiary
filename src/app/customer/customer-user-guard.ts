import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class OnlyCustomerUsersGuard implements CanActivate {
  
  constructor(public router: Router) {}
  canActivate() {
    const user = (<any>window).user;
    if(!AuthService.$initialURLPath) {
      AuthService.$initialURLPath = window.location.pathname
    }
    
    if(user) {
      if(user.isAdmin) {
        if(AuthService.$initialURLPath.match('/admin/'))
          this.router.navigate([AuthService.$initialURLPath]);
        else
          this.router.navigate(['/admin']);
      }
    } else 
      this.router.navigate(['/auth/login']);
    return user && !user.isAdmin;
  }
}
