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
  dockets: any[],
  synosisType: string
}

@Component({
  selector: 'app-edit-synopses',
  templateUrl: './edit-synopses.component.html',
  styleUrls: ['./edit-synopses.component.scss']
})
export class EditSynopsesComponent implements OnInit {

  location:string = "";
  form: FormGroup;
  synopses: any = {}

  items: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditSynopsesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private api: ApiService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.synopses = this.data;
    // this.synopses.appearances = this.synopses.appearances.replaceAll("<br>", '\n');
    for(let i = 0; i < this.synopses.dockets.length; i++){
      this.items.push({
        id: this.synopses.dockets[i].id,
        title: this.synopses.dockets[i].title,
        docket_num: this.synopses.dockets[i].docket_num,
        time: this.synopses.dockets[i].time,
        summary: this.synopses.dockets[i].summary,
        panel: this.synopses.dockets[i].panel,
        location: this.synopses.dockets[i].location,
        active: this.synopses.dockets[i].active,
      })
    }
  }


    submit(){

    let url = `synopses/update/${this.synopses.id}`;
    // this.synopses.appearances = this.synopses.appearances.replaceAll("\n", '<br>');
    this.synopses.dockets = this.items;
    // this.synopses.appearances.replaceAll('\n', '<br>')

    let _data = JSON.parse(JSON.stringify(this.synopses));
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
      id: null,
      title: '',
      docket_num: '',
      time: '',
      summary: '',
      panel: '',
      location: '',
      active: 1,
    });
  }

  deleteRow(item:any, index:number){
    console.log(item)
    item.active = 0;
    // this.items.splice(index,1)
  }

}
