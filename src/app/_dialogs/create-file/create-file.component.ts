import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/_services/api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'src/app/_services/utility.service';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.scss']
})
export class CreateFileComponent implements OnInit {

  fileName:string = "";
  file:any = {};
  isSubmitting:boolean = false;
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreateFileComponent>,
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
      name: []
    });
  }

  async onFileChange(file){
    // console.log("File: ", file);
    // console.log("Filename: ", file[0].name);
    this.fileName = file[0].name;
    let blob = new Blob(file, {type: "audio/ogg"});
    let tempFile = new File([blob], this.fileName)

    this.file = tempFile;
  }

  submit(){
    this.isSubmitting = true;

    let url =  `files/store`;
    const formData: FormData = new FormData();

    formData.append('name', this.form.controls['name'].value);
    formData.append('file', this.file);

    this.api.post(url, formData).pipe(catchError((err: any) => {
      return of(err);
    })).subscribe((data:any) => {
      this.isSubmitting = false;

      if (data.status === 'success') {
        this.utilityService.openSuccessSnackBar('File uploaded!');
        this.dialogRef.close(true);
      } else {
        let errors = '';
        if (data && data.hasOwnProperty('error')) {
          for (const x in data.error.data) {
            errors += `${data.error.data[x]}`;
          }
        } else {
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
