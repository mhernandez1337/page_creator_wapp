import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  async readFile(file: any): Promise<any> {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                // let localUrl = event.target.result;
                // this.doFileCompression(localUrl, fileName)
                resolve(event);
            }
        
            reader.readAsDataURL(file);
        });
    }
}
