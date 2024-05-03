import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminLayoutModule } from 'src/app/_layouts/admin-layout/admin-layout.module'
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedPagesModule } from 'src/app/shared/shared-pages.module';
import { UsersComponent } from './_pages/admin/users/users/users.component';
import { EditEventComponent } from './_dialogs/edit-event/edit-event.component';
import { EditUserComponent } from './_dialogs/edit-user/edit-user.component';
import { EditPasswordComponent } from './_dialogs/edit-password/edit-password.component';
import { CreateEventComponent } from './_dialogs/create-event/create-event.component';
import { CreateUserComponent } from './_dialogs/create-user/create-user.component';
import { CreateFileComponent } from './_dialogs/create-file/create-file.component';
import { EditFileComponent } from './_dialogs/edit-file/edit-file.component';
import { RecordingsComponent } from './_pages/recordings/recordings.component';
import { SynopsesComponent } from './_pages/synopses/synopses.component';
import { CoaRecordingComponent } from './_pages/coa-recording/coa-recording.component';
import { CoaSynopsesComponent } from './_pages/coa-synopses/coa-synopses.component';
import { PublicHearingsComponent } from './_pages/public-hearings/public-hearings.component';
import { CreateRecordingComponent } from './_dialogs/create-recording/create-recording.component';
import { EditRecordingComponent } from './_dialogs/edit-recording/edit-recording.component';
import { CreateSynopsesComponent } from './_dialogs/create-synopses/create-synopses.component';
import { EditSynopsesComponent } from './_dialogs/edit-synopses/edit-synopses.component'

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    EditEventComponent,
    EditUserComponent,
    EditPasswordComponent,
    CreateEventComponent,
    CreateUserComponent,
    CreateFileComponent,
    EditFileComponent,
    RecordingsComponent,
    SynopsesComponent,
    CoaRecordingComponent,
    CoaSynopsesComponent,
    PublicHearingsComponent,
    CreateRecordingComponent,
    EditRecordingComponent,
    CreateSynopsesComponent,
    EditSynopsesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    HttpClientModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    RouterModule,
    AdminLayoutModule,
    SharedModule,
    SharedPagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
