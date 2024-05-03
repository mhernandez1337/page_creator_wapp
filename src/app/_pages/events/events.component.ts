import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditEventComponent } from 'src/app/_dialogs/edit-event/edit-event.component';
import { CreateEventComponent } from 'src/app/_dialogs/create-event/create-event.component';
import { SigninService } from'src/app/_services/signin.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: any = [];
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

  constructor(
    private api: ApiService,
    public dialog: MatDialog,
    private signinService: SigninService
  ) { }

  ngOnInit(): void {
    this.getEvents();
  }


  getEvents(page?: PageEvent): void {
    this.isLoading = true;

    if(page != null){
      this.pageIndex = page.pageIndex + 1;
      this.pageSize = page.pageSize
    }

    let searchData = {};
    let url = '';

    if(this.search && this.search.search ){
      searchData = {
        search: this.search.search
      };
      url = `events/search/${this.pageSize}?page=${this.pageIndex}`;
      this.api.post(url, searchData).pipe(catchError((err: any) => {
        return of(err);
        })).subscribe((data: any) => {
        this.isLoading = false;
        
        if (data.status === 'fail'){
          console.log('get students failed');
        }else{
          this.events = data.data.data;
          this.length = data.data.total;
        }
        });
      }
    else {
      url = `events/paginate/${this.pageSize}?page=${this.pageIndex}`;
      this.api.get(url).pipe(catchError((err: any) => {
        return of(err);
      })).subscribe((data: any) => {
        this.isLoading = false;
        
        if (data.status === 'fail'){
          console.log('get events failed');
        }else if(data.status === 'success'){
          this.events = data.data.data;
          this.length = data.data.total;
        }
        else if(data.error.message && data.error.message ==  'Unauthenticated.'){
          this.signinService.logout();
        }
      });
    }
  }

  createEvent() {
    const dialogRef = this.dialog.open(CreateEventComponent , {
      width: '425px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      this.ngOnInit();
    });
  }

  editEvent(event:any) {
    const dialogRef = this.dialog.open(EditEventComponent , {
      width: '425px',
      height: '500px',
      data: {
        id: event.id,
        title: event.title,
        docket_number: event.docket_num,
        date: event.date_time,
        summary: event.summary,
        location: event.location,
        issues: event.issues
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      this.ngOnInit();
    });
  }

}
