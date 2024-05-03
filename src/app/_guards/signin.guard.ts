import { Injectable } from '@angular/core';
import { TransitionCheckState } from '@angular/material/checkbox';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/_services/user.service'

@Injectable({
  providedIn: 'root'
})
export class SigninGuard implements CanActivate {
  constructor (
    private userService: UserService,
    private router: Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // if(this.userService.userIsLoggedIn()){
    //   this.router.navigate([''])
    // }
    
  return true;
  }
  
}
