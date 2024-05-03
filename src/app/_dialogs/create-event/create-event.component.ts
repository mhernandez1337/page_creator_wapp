import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/_services/api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'src/app/_services/utility.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  form: FormGroup;
  isSubmitting: boolean;

  constructor(
    public dialogRef: MatDialogRef<CreateEventComponent>,
    private api: ApiService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.form = this.fb.group({
      title: [],
      docket_number: [],
      date: [],
      summary: [],
      location: [],
      issues: []
    });
  }

  submit(){
    // console.log("Form: ", this.form);
    let url = `events/store`;

    let formData: FormData = new FormData();

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
        this.dialogRef.close(true);
        this.utilityService.openSuccessSnackBar('Event created!');
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
  cancel() {
    this.dialogRef.close(false);
  }

}
