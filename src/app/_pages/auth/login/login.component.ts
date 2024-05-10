import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SigninService } from 'src/app/_services/signin.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;
  isSubmitted: boolean = false;
  isSubmitting: boolean = false;
  apiError: any = '';

  constructor(
    private signinService: SigninService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.form = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onLogin() {
    if (this.form.invalid) {
      return;
    }

    this.isSubmitted = true;
    this.apiError = '';

    this.signinService.login(this.form.getRawValue()).then(async (response: any) => {
      this.isSubmitted = false;

      if (response.status != 'success') {
        // Toast a warning that something went wrong
        if (response && response.error && response.error.data && response.error.data.login) {
          this.apiError = response.error.data.login;
        } else {
          this.apiError = 'An error occurred';
        }
      } else {
        // success
        if (response.data.user.role && response.data.user.role == environment.role_admin) {
          this.router.navigate(['/admin/recordings']);
        } else if (response.data.user.role && response.data.user.role == environment.role_user) {
          this.router.navigate([`/user/recordings`]);
        } else {
          this.apiError = 'An error occurred';
        }
      }
    });
  }

}
