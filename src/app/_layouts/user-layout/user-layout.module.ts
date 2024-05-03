import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { UserLayoutComponent } from './user-layout.component';

import { SharedPagesModule } from 'src/app/shared/shared-pages.module'
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UserLayoutComponent
  ],
  imports: [
    CommonModule,
    UserLayoutRoutingModule,
    SharedPagesModule,
    SharedModule
  ]
})
export class UserLayoutModule { }
