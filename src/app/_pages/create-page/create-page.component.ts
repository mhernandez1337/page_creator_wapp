import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilService } from '../../_services/util.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  fileName:string = "";
  file:any = {};
  isSubmitting:boolean = false;

  constructor(
    private api: ApiService,
    private util: UtilService
  ) { }

  ngOnInit(): void {
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

    let url =  `file/store`;
    const formData: FormData = new FormData();

    formData.append('name', this.fileName);
    formData.append('file', this.file);

    this.api.post(url, formData).pipe(catchError((err: any) => {
      return of(err);
    })).subscribe((data:any) => {
      this.isSubmitting = false;
      console.log("Data", data);
      if(data.status = 'success'){
        console.log("Success!")
        window.history.pushState(data, 'something', 'url');
      }else{
        console.log("Failure!")
      }
    })

    // formData.append('file', )
  }

}
