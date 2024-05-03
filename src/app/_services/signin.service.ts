import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service'

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(
    private api: ApiService,
    private router: Router,
    private userService: UserService
  ) { }

  login(loginData: any) {
    return new Promise((resolve, reject) => {
        this.api.post(`auth/login`, loginData)
        .subscribe((res: any) => {
            let user = res.data.user;
            if (user) {
                this.userService.setUser(user);
            }
            resolve(res);
        }, (err: any) => {
            resolve(err);
        });
    });
  }

  verify() {
    return new Promise((resolve, reject) => {
        this.api.get(`auth/verify`)
        .subscribe((res: any) => {
            let user = res.data.user;
            if (user) {
                this.userService.setUser(user);
            }
            resolve(res);
        }, (err: any) => {
            resolve(err);
        });
    });
  }

  // navigates to sign in page on success
  logout() {
    return new Promise((resolve, reject) => {
        this.api.post(`auth/logout`)
        .subscribe((res: any) => {
            this.userService.deleteUser();
            this.router.navigate(['/auth/login']);
            resolve(res);
        }, (err: any) => {
            resolve(err);
        });
    });

    location.reload();
  }
}
