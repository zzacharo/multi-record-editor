import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/zip';
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable()
export class QueryService {
  url = 'http://localhost:5000/api/multieditor';
  schemaUrl = 'http://localhost:5000';
  constructor(private http: Http) {
  }

  submitActions(userActions: object[], checkedRecords: string[], allSelected: boolean): Promise<Object> {
    return this.http
      .post(`${this.url}/update`, {
        'userActions': userActions,
        'ids': checkedRecords,
        'allSelected': allSelected,
      }
      )
      .map(res => res.json())
      .toPromise();
  }

  previewActions(userActions: object[], queryUsed: string, currentPage: number, pageSize: number): Promise<Object[]> {
    return this.http
      .post(`${this.url}/preview`, {
        'userActions': userActions,
        'queryString': queryUsed,
        'pageNum': currentPage
      }
      )
      .map(res => res.json())
      .toPromise();
  }

  getNewPageRecords(userActions: object[], queryUsed: string, currentPage: number, indexUsed: string, pageSize: number): Observable<any> {
    return Observable.zip(
      this.http
        .get(`${this.url}/search?page_num=${currentPage}&query_string=${queryUsed}&index=${indexUsed}&pageSize=${pageSize}`)
        .map(res => res.json()),
      this.http
        .post(`${this.url}/preview`, {
          userActions,
          queryString: queryUsed,
          pageNum: currentPage,
          pageSize
        }
        )
        .map(res => res.json()),
      (oldRecords, newRecords) => {
        return {
          oldRecords,
          newRecords
        };
      });
  }

  searchRecords(query: string, currentPage: number, selectedCollection: string, pageSize: number): Promise<Object> {
    return this.http
      .get(`${this.url}/search?pageNum=${currentPage}&queryString=${query}&index=${selectedCollection}&pageSize=${pageSize}`)
      .map(res => res.json())
      .toPromise();
  }

  getCollection(selectedCollection: string): Promise<Object> {
    return this.http
      .get(`${this.schemaUrl}/schemas/records/${selectedCollection}.json`)
      .map(res => res.json())
      .toPromise();
  }
}
