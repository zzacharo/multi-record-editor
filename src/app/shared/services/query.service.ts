import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/zip';

import { environment } from '../../../environments/environment';
import { UserActions, QueryResult, RecordsPreview, RecordsToCompare } from '../interfaces';

@Injectable()
export class QueryService {
  private url = `${environment.baseUrl}/api/multieditor`;
  private schemaUrl = `${environment.baseUrl}/schemas/records`;

  constructor(private http: Http) {}

  save(userActions: UserActions, checkedRecords: string[]): Promise<void> {
    return this.http
      .post(`${this.url}/update`, {
        userActions,
        ids: checkedRecords,
      }).map(res => res.json())
      .toPromise();
  }

  previewActions(userActions: UserActions, queryString: string, page: number, pageSize: number): Promise<RecordsPreview> {
    return this.http
      .post(`${this.url}/preview`, {
        userActions,
        queryString,
        pageNum: page,
        pageSize
      }).map(res => res.json())
      .toPromise();
  }

  fetchBundledRecords(query: string, page: number, collection: string, pageSize: number,
     userActions: UserActions): Observable<RecordsToCompare> {
    return Observable.zip(
      this.searchRecords(query, page, collection, pageSize)
      ,
      this.http
        .post(`${this.url}/preview`, {
          userActions,
          queryString: query,
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

  searchRecords(query: string, page: number, collection: string, pageSize: number): Observable<QueryResult> {
    return this.http
      .get(`${this.url}/search?pageNum=${page}&queryString=${query}&index=${collection}&pageSize=${pageSize}`)
      .map(res => res.json());
  }

  fetchCollectionSchema(selectedCollection: string): Promise<object> {
    return this.http
      .get(`${this.schemaUrl}/${selectedCollection}.json`)
      .map(res => res.json())
      .toPromise();
  }
}
