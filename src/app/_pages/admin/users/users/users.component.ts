import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from 'src/app/_dialogs/edit-user/edit-user.component';
import { EditPasswordComponent } from 'src/app/_dialogs/edit-password/edit-password.component';
import { CreateUserComponent } from 'src/app/_dialogs/create-user/create-user.component';
import { SigninService } from'src/app/_services/signin.service';
import { PageEvent } from '@angular/material/paginator';

export interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  active: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

  isLoading:boolean = false;
  users:any = [];
  userStatus:number = 1;
  dataSource: any = [];
  displayedColumns: string [] = [
    'id',
    'name',
    'email',
    'role',
    'active',
    'password'
  ];

  // MatPaginator Inputs
  length: number;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  pageIndex: number = 0;

  // MatPaginator Output
  pageEvent: PageEvent;

  //Search variable
  search: any = {
      search: ''
  };
  constructor(
    private api: ApiService,
    public dialog: MatDialog,
    private signinService: SigninService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(page?: PageEvent): void {
    this.isLoading = true;
    let searchData = {};

    if(page != null){
      this.pageIndex = page.pageIndex + 1;
      this.pageSize = page.pageSize
    }

    let url = '';
    if(this.search && this.search.search ){
      searchData = {
        search: this.search.search
      };
      url = `users/search/${this.pageSize}?page=${this.pageIndex}`;
      this.api.post(url, searchData).pipe(catchError((err: any) => {
        return of(err);
        })).subscribe((data: any) => {
        this.isLoading = false;
        
        if (data.status === 'fail'){
          console.log('get students failed');
        }else{
          this.users = data.data.data;
          this.length = data.data.total;
        }
        });
      }
    else {
      url = `users/paginate/${this.userStatus}/${this.pageSize}?page=${this.pageIndex}`;

      this.api.get(url).pipe(catchError((err: any) => {
        return of(err);
      })).subscribe((data: any) => {
        this.isLoading = false;
        console.log(data)
        if (data.status === 'fail'){
          console.log('get users failed');
        }else if(data.status === 'success'){
          this.users = data.data.data;
          this.dataSource.data = this.users;
          this.length = data.data.total;
        }else if(data.error.message && data.error.message ==  'Unauthenticated.'){
          this.signinService.logout();
        }
      });
    }
  }

  editUser(user:any){
    const dialogRef = this.dialog.open(EditUserComponent , {
      width: '400px',
      height: '350px',
      data: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        active: user.active
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      this.ngOnInit();
    });
  }

  updatePassword(id: number){
    const dialogRef = this.dialog.open(EditPasswordComponent , {
      width: '400px',
      height: '300px',
      data: {
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      this.ngOnInit();
    });
  }

  createUser(){
    const dialogRef = this.dialog.open(CreateUserComponent , {
      width: '400px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      this.ngOnInit();
    });
  }
}
