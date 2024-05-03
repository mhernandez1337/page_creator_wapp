import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseUrl: string;

  constructor(private http:HttpClient) { 
    this.baseUrl = `${environment.apiProtocol}://${environment.apiBaseUrl}/`;
  }

  get(uri: string, data: any = {}){
     let options: any = {
       withCredentials: true
     };
     if(data) {
       options.params = data;
     }

     return this.http.get(`${this.baseUrl}${uri}`, options);
   }

   post(uri: string, data: any = {}){
     return this.http.post(`${this.baseUrl}${uri}`, data, {withCredentials: true});
   }

   put(uri: string, data: any = {}){
     return this.http.post(`${this.baseUrl}${uri}`,data);
   }

   delete(uri: string, data: any = {}){
     return this.http.delete(`${this.baseUrl}${uri}`,data);
   }

}
