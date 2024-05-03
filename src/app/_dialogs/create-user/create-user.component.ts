import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/_services/api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'src/app/_services/utility.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  form: FormGroup;
  isSubmitting: boolean;
  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
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
      first_name: [],
      last_name: [],
      email: [],
      password: [],
      password_confirmation: []
    });
  }

  submit(){
    this.isSubmitting = true;

    let url = `users/create`;

    const formData: FormData = new FormData();
    
    formData.append('first_name', this.form.controls['first_name'].value);
    formData.append('last_name', this.form.controls['last_name'].value);
    formData.append('email', this.form.controls['email'].value);
    formData.append('password', this.form.controls['password'].value);
    formData.append('password_confirmation', this.form.controls['password_confirmation'].value);

    this.api.post(url, formData).pipe(catchError((err: any) => {
      return of(err);
    })).subscribe((data: any) => {
      let errors = '';
      this.isSubmitting = false;

      if (data.status === 'success') {
        this.utilityService.openSuccessSnackBar('User created!');
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
