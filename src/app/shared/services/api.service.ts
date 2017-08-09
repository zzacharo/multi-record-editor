import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  fetchUrl(url: string): Observable<Array<{}>> {
    return this.http.get(url)
      .map(res => res.json());
  }
}
