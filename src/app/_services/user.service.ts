import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  userIsAdmin(){
    this.user;

    if(!this.user){
        return false;
    }
    
    return this.user.role == environment.role_admin;
  }

  userIsUser(){
    this.user;

    if(!this.user){
        return false;
    }
    
    return this.user.role == environment.role_user;
  }

  userIsLoggedIn(){
    return !!localStorage.getItem('currentUser')
  }

  get status() {
    return !!localStorage.getItem('currentUser');
  }

  get user() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  getUserId(){
    return localStorage.getItem('currentUser');
  }

  setUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  deleteUser(){
    delete localStorage.currentUser;
  }
}
