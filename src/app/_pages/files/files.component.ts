import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SigninService } from'src/app/_services/signin.service';
import { UtilService } from '../../_services/util.service';
import { EditFileComponent } from 'src/app/_dialogs/edit-file/edit-file.component';
import { CreateFileComponent } from 'src/app/_dialogs/create-file/create-file.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  files: any = [];
  isLoading:Boolean = false;
  displayedColumns: string [] = [
    'id',
    'name',
    'path',
    'type'
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
    this.getFiles();
  }


  getFiles(page?: PageEvent): void {
    this.isLoading = true;

    if(page != null){
      this.pageIndex = page.pageIndex + 1;
      this.pageSize = page.pageSize
    }

    let searchData = {};
    let url = '';

    if(this.search && this.search.search){
      searchData = {
        search: this.search.search
      };
      
      url = `files/search/${this.pageSize}?page=${this.pageIndex}`;
      this.api.post(url, searchData).pipe(catchError((err: any) => {
      return of(err);
      })).subscribe((data: any) => {
      this.isLoading = false;
      
      if (data.status === 'fail'){
        console.log('get students failed');
      }else{
        this.files = data.data.data;
        this.length = data.data.total;
      }
      });
    }else{
      url = `files/paginate/${this.pageSize}?page=${this.pageIndex}`;

      this.api.get(url).pipe(catchError((err: any) => {
        return of(err);
      })).subscribe((data: any) => {
        this.isLoading = false;
        if (data.status === 'fail'){
          console.log('get users failed');
        }else if(data.status === 'success'){
          this.files = data.data.data;
          this.length = data.data.total;
        }else if(data.error.message && data.error.message ==  'Unauthenticated.'){
          this.signinService.logout();
        }
      });
    }
  }

  editFile(file:any){
    const dialogRef = this.dialog.open(EditFileComponent , {
      width: '425px',
      height: '500px',
      data: {
        id: file.id,
        name: file.name,
        path: file.path,
        type: file.type
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      this.ngOnInit();
    });
  }

  createFile(){
    const dialogRef = this.dialog.open(CreateFileComponent , {
      width: '425px',
      height: '357px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      this.ngOnInit();
    });
  }

}
