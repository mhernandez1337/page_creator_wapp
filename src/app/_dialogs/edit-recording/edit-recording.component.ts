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
  date: string,
  type: string,
  location: string,
  time: string,
  note: string,
  appearances: string,
  docket_num: string,
  link:string,
  content: any[],
  recordingType: string
}

@Component({
  selector: 'app-edit-recording',
  templateUrl: './edit-recording.component.html',
  styleUrls: ['./edit-recording.component.scss']
})
export class EditRecordingComponent implements OnInit {

  location:string = "";
  form: FormGroup;
  recording: any = {}

  items: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditRecordingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private api: ApiService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.recording = this.data;
    this.recording.appearances = this.recording.appearances.replaceAll("<br>", '\n');
    for(let i = 0; i < this.recording.content.length; i++){
      this.items.push({
        id: this.recording.content[i].id,
        time: this.recording.content[i].time,
        speaker: this.recording.content[i].speaker,
        note: this.recording.content[i].note,
        active: this.recording.content[i].active,
      })
    }
  }


    submit(){

    let url = `recordings/update/${this.recording.id}`;
    this.recording.appearances = this.recording.appearances.replaceAll("\n", '<br>');
    this.recording.content = this.items;
    this.recording.appearances.replaceAll('\n', '<br>')

    let _data = JSON.parse(JSON.stringify(this.recording));
    console.log(_data)

    this.api.post(url, _data).pipe(catchError((err:any) => {
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

  addRow(){
    this.items.push({
     time:'',
     speaker:'',
     note:'',
     active: 1,
     id: null
    });
  }

  deleteRow(item:any, index:number){
    console.log(item)
    item.active = 0;
    // this.items.splice(index,1)
  }

}
