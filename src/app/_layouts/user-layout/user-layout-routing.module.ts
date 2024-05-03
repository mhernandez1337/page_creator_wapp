import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from 'src/app/_pages/events/events.component';
import { FilesComponent } from 'src/app/_pages/files/files.component';
import { RecordingsComponent } from 'src/app/_pages/recordings/recordings.component';

const routes: Routes = [
  {
    path: 'arguments',
    component: EventsComponent
  },
  {
    path: 'files',
    component: FilesComponent
  },
  {
    path: 'recordings',
    component: RecordingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule { }
