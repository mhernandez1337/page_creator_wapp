import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/_services/api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'src/app/_services/utility.service';

export interface DialogData {
  id: number,
  title: string,
  docket_number: string,
  date: Date,
  summary: string,
  location: string,
  issues: number
}

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  location:string = "";
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private api: ApiService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.form = this.fb.group({
      title: [this.data.title],
      docket_number: [this.data.docket_number],
      date: [this.data.date],
      summary: [this.data.summary],
      location: [this.data.location],
      issues: [this.data.issues]
    });
  }

    submit(){

    let url = `events/edit`;

    let formData: FormData = new FormData();

    formData.append('id', (this.data.id).toString());
    formData.append('title', this.form.controls['title'].value);
    formData.append('docket_num', this.form.controls['docket_number'].value);
    formData.append('location', this.form.controls['location'].value);
    formData.append('date_time', this.form.controls['date'].value);
    formData.append('summary', this.form.controls['summary'].value);
    formData.append('issues', this.form.controls['issues'].value);

    this.api.post(url, formData).pipe(catchError((err:any) => {
      return of(err);
    })).subscribe((data:any) => {
      if(data.status == 'success'){
        this.utilityService.openSuccessSnackBar('Event updated!');
        this.dialogRef.close(true);
      }else{
        let errors = '';
        if(data && data.hasOwnProperty('error')){
          for(const x in data.error.data) {
            errors += `${data.error.data[x]}`;
          }
        }else{
          errors = 'An error occurred';
        }
        let errorMsg = 'Error: ' + errors;
        this.utilityService.openErrorSnackBar(errorMsg);
      }
    })
  }

  cancel(){
    this.dialogRef.close(false);
  }
}
