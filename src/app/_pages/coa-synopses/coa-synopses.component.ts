import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditSynopsesComponent } from 'src/app/_dialogs/edit-synopses/edit-synopses.component';
import { CreateSynopsesComponent } from 'src/app/_dialogs/create-synopses/create-synopses.component';
import { SigninService } from'src/app/_services/signin.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-coa-synopses',
  templateUrl: './coa-synopses.component.html',
  styleUrls: ['./coa-synopses.component.scss']
})
export class CoaSynopsesComponent implements OnInit {

  synopses: any = [];
  isLoading:Boolean = false;

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

  dataSource: any = [];
  displayedColumns: string [] = [
    'id',
    'title',
    'date',
    'web_link'
  ];

  constructor(
    private api: ApiService,
    public dialog: MatDialog,
    private signinService: SigninService
  ) { }

  ngOnInit(): void {
    this.getSynopses();
  }

  getSynopses(page?: PageEvent): void {
    this.isLoading = true;

    if(page != null){
      this.pageIndex = page.pageIndex + 1;
      this.pageSize = page.pageSize
    }

    let searchData = {};
    let url = '';

    if(this.search && this.search.search ){
      searchData = {
        search: this.search.search,
        type: 'coa_synopsis'
      };
      url = `synopses/search/${this.pageSize}?page=${this.pageIndex}`;
      this.api.post(url, searchData).pipe(catchError((err: any) => {
        return of(err);
        })).subscribe((data: any) => {
        this.isLoading = false;
        
        if (data.status === 'fail'){
          console.log('get events failed');
        }else{
          this.synopses = data.data.data;
          this.length = data.data.total;
          
        }
        });
      }
    else {
      url = `synopses/allcoasynopses/${this.pageSize}?page=${this.pageIndex}`;
      this.api.get(url).pipe(catchError((err: any) => {
        return of(err);
      })).subscribe((data: any) => {
        this.isLoading = false;
        
        if (data.status === 'fail'){
          console.log('get events failed');
        }else if(data.status === 'success'){
          this.synopses = data.data.data;
          this.length = data.data.total;
        }
        else if(data.error.message && data.error.message ==  'Unauthenticated.'){
          this.signinService.logout();
        }
      });
    }
  }
  // synosisType is to be used for front end display
  // type is used for saving the data to API
  createSynopses() {
    const dialogRef = this.dialog.open(CreateSynopsesComponent , {
      width: '600px',
      height: '650px',
      data: {
        synosisType: 'COA Synopses',
        type: 'coa_synopsis'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      this.ngOnInit();
    });
  }

  editSynopses(event:any) {
    console.log(event);
    const dialogRef = this.dialog.open(EditSynopsesComponent , {
      width: '600px',
      height: '650px',
      data: {
        id: event.id,
        title: event.title,
        dockets: event.dockets,
        type: event.type,
        date: event.date,
        synosisType: 'COA Synopses',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.ngOnInit();
    });
  }
}
