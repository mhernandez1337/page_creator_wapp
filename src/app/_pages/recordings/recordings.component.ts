import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditRecordingComponent } from 'src/app/_dialogs/edit-recording/edit-recording.component';
import { CreateRecordingComponent } from 'src/app/_dialogs/create-recording/create-recording.component';
import { SigninService } from'src/app/_services/signin.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-recordings',
  templateUrl: './recordings.component.html',
  styleUrls: ['./recordings.component.scss']
})
export class RecordingsComponent implements OnInit {

  recordings: any = [];
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
    'docket_num',
    'location',
    'web_link'
  ];

  constructor(
    private api: ApiService,
    public dialog: MatDialog,
    private signinService: SigninService
  ) { }

  ngOnInit(): void {
    this.getRecordings();
  }

  getRecordings(page?: PageEvent): void {
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
        type: 'recording'
      };
      url = `recordings/search/${this.pageSize}?page=${this.pageIndex}`;
      this.api.post(url, searchData).pipe(catchError((err: any) => {
        return of(err);
        })).subscribe((data: any) => {
        this.isLoading = false;
        
        if (data.status === 'fail'){
          console.log('get recordings failed');
        }else{
          this.recordings = data.data.data;
          this.length = data.data.total;
          
        }
        });
      }
    else {
      url = `recordings/allrecordings/${this.pageSize}?page=${this.pageIndex}`;
      this.api.get(url).pipe(catchError((err: any) => {
        return of(err);
      })).subscribe((data: any) => {
        this.isLoading = false;
        
        if (data.status === 'fail'){
          console.log('get events failed');
        }else if(data.status === 'success'){
          this.recordings = data.data.data;
          this.length = data.data.total;
        }
        else if(data.error.message && data.error.message ==  'Unauthenticated.'){
          this.signinService.logout();
        }
      });
    }
  }
  // recordingType is to be used for front end display
  // type is used for saving the data to API
  createRecording() {
    const dialogRef = this.dialog.open(CreateRecordingComponent , {
      width: '600px',
      height: '650px',
      data: {
        recordingType: 'Recording',
        type: 'recording'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      this.ngOnInit();
    });
  }

  editRecording(event:any) {
    console.log(event);
    const dialogRef = this.dialog.open(EditRecordingComponent , {
      width: '600px',
      height: '650px',
      data: {
        id: event.id,
        title: event.title,
        date: event.date,
        type: event.type,
        link: event.recording[0].link,
        location: event.recording[0].location,
        time: event.recording[0].time,
        docket_num: event.recording[0].docket_num,
        note: event.recording[0].note,
        appearances: event.recording[0].appearances,
        content: event.recording_content,
        recordingType: 'Recording',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.ngOnInit();
    });
  }
}
