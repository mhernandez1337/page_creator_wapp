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

  get(uri: string, data: any = {}) {
        let _params = new HttpParams();

        for (const property in data) {
            _params = _params.append(property, data[property]);
        }

        return this.http.get(`${this.baseUrl}${uri}`, { params: _params, withCredentials: false });
    }

    post(uri: string, data: any = {}) {
        return this.http.post(`${this.baseUrl}${uri}`, data, { withCredentials: false });
    }
}
