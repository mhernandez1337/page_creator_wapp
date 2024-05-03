import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/_services/api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'src/app/_services/utility.service';

export interface DialogData {
  id: number
}

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})

export class EditPasswordComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean;
  isSubmitting: boolean;
  activeOption:number;
  roleOption: string;

  constructor(
    public dialogRef: MatDialogRef<EditPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
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
      password: [''],
      password_confirmation: ['']
    });
  }

  submit(){
    this.isSubmitting = true;

    let url = `users/update-password`;

    const formData: FormData = new FormData();
    console.log(this.form)
    formData.append('id', this.data.id.toString());
    formData.append('password', this.form.controls['password'].value);
    formData.append('password_confirmation', this.form.controls['password_confirmation'].value);

    this.api.post(url, formData).pipe(catchError((err: any) => {
      return of(err);
    })).subscribe((data: any) => {
      let errors = '';
      this.isSubmitting = false;

      if (data.status === 'success') {
        this.utilityService.openSuccessSnackBar('Password updated!');
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
    });
  }

  cancel(){
    this.dialogRef.close(false);
  }

}
