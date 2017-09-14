import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable()
export class QueryService {

  constructor(private http: Http) { }
  
  submitActions(userActions:object[], url:string, checkedRecords:number[], allSelected:boolean): Promise<Object>{
    return this.http
    .post(`${url}/update`, {
      'userActions': userActions,
      'ids': checkedRecords,
      'allSelected': allSelected,
    }
    )
    .map(res => res.json())
    .toPromise()
  }

  previewActions(userActions:object[], url:string, queryUsed:string, currentPage:number): Promise<Object[]>{
    return this.http
      .post(`${url}/preview`, {
        'userActions': userActions,
        'queryString': queryUsed,
        'pageNum': currentPage
      }
      )
      .map(res => res.json())
      .toPromise()
  }

  getNewPageRecords(userActions:object[], url:string, queryUsed:string, currentPage:number, indexUsed:string): Observable<any>{
      return Observable.zip(
        this.http
          .get(`${url}/search?page_num=${currentPage}&query_string=${queryUsed}&index=${indexUsed}`)
          .map(res => res.json()),
        this.http
          .post(`${url}/preview`, {
            'userActions': userActions,
            'queryString': queryUsed,
            'pageNum': currentPage
          }
          )
          .map(res => res.json()),
        (oldRecords, newRecords) => {
          return {
            oldRecords: oldRecords,
            newRecords: newRecords
          }
        })
    }

  searchRecords(url:string, query:string, currentPage:number, selectedCollection:string): Promise<Object>{
    return this.http
    .get(`${url}/search?page_num=${currentPage}&query_string=${query}&index=${selectedCollection}`)
    .map(res => res.json())
    .toPromise()
  }

  getCollection(url:string, selectedCollection:string): Promise<Object>{
    return this.http
    .get(`${url}/schemas/records/${selectedCollection}.json`)
    .map(res => res.json())
    .toPromise()
  }
  }
