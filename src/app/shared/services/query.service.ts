import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/zip';

import { environment } from '../../../environments/environment';
import { UserActions } from '../interfaces';

@Injectable()
export class QueryService {
  readonly url = `${environment.baseUrl}/api/multieditor`;
  readonly schemaUrl = `${environment.baseUrl}/schemas/records`;

  constructor(private http: Http) { }

  submitActions(userActions: UserActions, checkedRecords: string[], allSelected: boolean): Promise<void> {
    return this.http
      .post(`${this.url}/update`, {
        userActions,
        allSelected,
        ids: checkedRecords,
      }).map(res => res.json())
      .toPromise();
  }

  previewActions(userActions: UserActions, queryString: string, pageNum: number, pageSize: number): Promise<object[]> {
    return this.http
      .post(`${this.url}/preview`, {
        userActions,
        queryString,
        pageNum,
        pageSize
      }).map(res => res.json())
      .toPromise();
  }

  fetchNewPageRecords(userActions: UserActions, queryString: string, page: number, collection: string, pageSize: number): Observable<any> {
    return Observable.zip(
      this.http
        .get(`${this.url}/search?pageNum=${page}&query_string=${queryString}&index=${collection}&pageSize=${pageSize}`)
        .map(res => res.json()),
      this.http
        .post(`${this.url}/preview`, {
          userActions,
          queryString,
          pageSize,
          pageNum: page,
        }).map(res => res.json()),
      (oldRecords, newRecords) => {
        return {
          oldRecords,
          newRecords
        };
      });
  }

  searchRecords(query: string, page: number, collection: string, pageSize: number): Promise<object> {
    return this.http
      .get(`${this.url}/search?pageNum=${page}&queryString=${query}&index=${collection}&pageSize=${pageSize}`)
      .map(res => res.json())
      .toPromise();
  }

  fetchCollectionSchema(selectedCollection: string): Promise<object> {
    return this.http
      .get(`${this.schemaUrl}/${selectedCollection}.json`)
      .map(res => res.json())
      .toPromise();
  }
}
