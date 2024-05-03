import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/_services/api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'src/app/_services/utility.service';
import * as moment from 'moment';

// type is to be used for front end display
// recordingType is used for saving the data to API
export interface DialogData {
  type: string,
  recordingType: string
}

@Component({
  selector: 'app-create-recording',
  templateUrl: './create-recording.component.html',
  styleUrls: ['./create-recording.component.scss']
})
export class CreateRecordingComponent implements OnInit {

  form: FormGroup;
  isSubmitting: boolean;
  rowIndex:number = 1;
  recording: any = {};
  dateTime: Date = new Date;

  items: any[] = [{
    time:'',
    speaker:'',
    note: ''
  }];

  constructor(
    public dialogRef: MatDialogRef<CreateRecordingComponent>,
    private api: ApiService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private utilityService: UtilityService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
    this.recording.type = this.data.type;
  }



  submit(){
    // console.log("Form: ", this.form);
    let url = `recordings/create`;
    this.recording.content = this.items;
    this.recording.date = moment(this.dateTime).format('YYYY-MM-DD');
    this.recording.time = moment(this.dateTime).format('HH:mm:ss');


    let _data = JSON.parse(JSON.stringify(this.recording));
    console.log("Data", _data);

    this.api.post(url, _data).pipe(catchError((err:any) => {
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

  addRow(){
    this.items.push({
     time:'',
     speaker:'',
     note:''
    });
  }

}
