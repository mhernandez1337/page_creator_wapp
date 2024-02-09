import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/_services/api.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-arguments',
  templateUrl: './arguments.component.html',
  styleUrls: ['./arguments.component.scss']
})
export class ArgumentsComponent implements OnInit {

  location:string = "";
  stateCtrl: FormControl;
  formGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private api: ApiService
  ) { this.stateCtrl = new FormControl();}

  ngOnInit(): void {
    this.initForms();
  }

  initForms(){
    this.formGroup = this._formBuilder.group({
      argumentTitle: ['',Validators.required],
      docketNumber: ['', Validators.required],
      location: ['', Validators.required],
      argumentDateTime: ['', Validators.required],
      summary: ['', Validators.required],
      issues: ['', Validators.required],
    });
  }

  submit(){
    console.log("Form: ", this.formGroup);
    let url = `arguments/store`;

    let formData: FormData = new FormData();

    formData.append('title', this.formGroup.controls['argumentTitle'].value);
    formData.append('docket_num', this.formGroup.controls['docketNumber'].value);
    formData.append('location', this.formGroup.controls['location'].value);
    formData.append('date_time', this.formGroup.controls['argumentDateTime'].value);
    formData.append('summary', this.formGroup.controls['summary'].value);
    formData.append('issues', this.formGroup.controls['issues'].value);

    this.api.post(url, formData).pipe(catchError((err:any) => {
      return of(err);
    })).subscribe((data:any) => {
      if(data.status == 'success'){
        console.log('data', data);
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
        // this.util.openErrorSnackBar(errorMsg);
      }
    })
  }

}
