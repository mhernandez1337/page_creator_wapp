import { Component, OnInit } from '@angular/core';
import { SigninService } from 'src/app/_services/signin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {

  constructor(
    private signinService: SigninService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkSession();
  }

  navigate(page:string) {
    this.router.navigate([`user/${page}`]);
  }

  logout(){
    this.signinService.logout();
  }

  checkSession(){
    // this is mainly to handle user returning to website 
    // when session is expired
    this.signinService.verify().then(async (data: any) => {
      if (data.error && data.error.data.error === 'Session not authenticated.') {
          this.logout();
      }
    });
  }

}
