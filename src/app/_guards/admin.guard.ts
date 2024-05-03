import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/_services/user.service'

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.userService.userIsLoggedIn() && this.userService.userIsAdmin()) {
        return true;
      }
      this.router.navigate(['/auth/login']);
      return false;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.userService.userIsLoggedIn() && this.userService.userIsAdmin()) {
          return true;
        }
      this.router.navigate(['/auth/login']);
      return false;
  }
  
}
