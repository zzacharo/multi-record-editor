import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  fetchUrl(url: string): Observable<any> {
    return this.http.get(url)
      .map(res => res.json())
  }
}
