import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from 'src/app/_pages/events/events.component';
import { FilesComponent } from 'src/app/_pages/files/files.component'
import { UsersComponent } from 'src/app/_pages/admin/users/users/users.component'
import { RecordingsComponent } from 'src/app/_pages/recordings/recordings.component';
import { CoaRecordingComponent } from 'src/app/_pages/coa-recording/coa-recording.component';
import { PublicHearingsComponent } from 'src/app/_pages/public-hearings/public-hearings.component';
import { SynopsesComponent } from 'src/app/_pages/synopses/synopses.component';
import { CoaSynopsesComponent } from 'src/app/_pages/coa-synopses/coa-synopses.component';

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
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'recordings',
    component: RecordingsComponent
  },
  {
    path: 'coa-recordings',
    component: CoaRecordingComponent
  },
  {
    path: 'public-hearings',
    component: PublicHearingsComponent
  },
  {
    path: 'synopses',
    component: SynopsesComponent
  },
  {
    path: 'coa-synopses',
    component: CoaSynopsesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
