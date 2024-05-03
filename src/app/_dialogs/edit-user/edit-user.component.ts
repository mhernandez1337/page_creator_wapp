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
  first_name: string,
  last_name: string,
  email: string,
  role: string,
  active: number
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean;
  isSubmitting: boolean;
  activeOption:number;
  roleOption: string;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private api: ApiService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.activeOption = this.data.active;
    this.roleOption = this.data.role;
  }

  initForm(){
    this.form = this.fb.group({
      first_name: [this.data.first_name],
      last_name: [this.data.last_name],
      email: [this.data.email],
      role: [this.data.role],
      active: [this.data.active]
    });
  }

  submit(){
    this.isSubmitting = true;

    let url = `users/edit`;

    const formData: FormData = new FormData();
    
    formData.append('id', this.data.id.toString());
    formData.append('first_name', this.form.controls['first_name'].value);
    formData.append('last_name', this.form.controls['last_name'].value);
    formData.append('email', this.form.controls['email'].value);
    formData.append('role', this.form.controls['role'].value);
    formData.append('active', this.form.controls['active'].value);

    this.api.post(url, formData).pipe(catchError((err: any) => {
      return of(err);
    })).subscribe((data: any) => {
      let errors = '';
      this.isSubmitting = false;

      if (data.status === 'success') {
        this.utilityService.openSuccessSnackBar('User updated!');
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
