import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/_pages/auth/login/login.component';
import { AuthRoutingModule } from './auth-layout-routing.module';
import { AuthLayoutComponent } from './auth-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthLayoutModule { }
