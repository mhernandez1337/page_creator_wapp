import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { SharedPagesModule } from 'src/app/shared/shared-pages.module'
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    SharedPagesModule,
    SharedModule
  ]
})
export class AdminLayoutModule { }
