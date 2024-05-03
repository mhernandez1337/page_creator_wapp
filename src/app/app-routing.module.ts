import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ArgumentsComponent } from './_pages/arguments/arguments.component';
// import { CreatePageComponent } from './_pages/create-page/create-page.component';
import { SigninGuard } from '../app/_guards/signin.guard';
import { AuthLayoutComponent } from 'src/app/_layouts/auth-layout/auth-layout.component';
import { AdminGuard } from 'src/app/_guards/admin.guard';
import { UserGuard } from 'src/app/_guards/user.guard'
import { AdminLayoutComponent } from 'src/app/_layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from 'src/app/_layouts/user-layout/user-layout.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [SigninGuard],
    component: AuthLayoutComponent,
    children: [{
        path: '',
        loadChildren: () => import ('./_layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule),
    }]
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    canActivateChild: [AdminGuard],
    component: AdminLayoutComponent,
    children: [
      {
          path: '',
          loadChildren: () => import('./_layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
      }
    ]
  },
  {
    path: 'user',
    canActivate: [UserGuard],
    canActivateChild: [UserGuard],
    component: UserLayoutComponent,
    children: [
      {
          path: '',
          loadChildren: () => import('./_layouts/user-layout/user-layout.module').then(m => m.UserLayoutModule),
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
