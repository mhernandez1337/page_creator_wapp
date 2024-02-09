import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArgumentsComponent } from './_pages/arguments/arguments.component';
import { CreatePageComponent } from './_pages/create-page/create-page.component';

const routes: Routes = [
  {
    path: '',
    component: CreatePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'create-argument',
    component: ArgumentsComponent,
    pathMatch: 'prefix',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
