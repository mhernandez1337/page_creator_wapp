import { Component, OnInit } from '@angular/core';
import { SigninService } from 'src/app/_services/signin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  panelOpenState:boolean = false;
  constructor(
    private signinService: SigninService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkSession();
  }

  navigate(page:string) {
    this.router.navigate([`admin/${page}`]);
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
