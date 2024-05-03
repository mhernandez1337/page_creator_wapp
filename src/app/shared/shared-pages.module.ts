import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from 'src/app/_pages/files/files.component';
import { EventsComponent } from 'src/app/_pages/events/events.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    FilesComponent,
    EventsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    FilesComponent,
    EventsComponent,
  ]
})
export class SharedPagesModule { }
