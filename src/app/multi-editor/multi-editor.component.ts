import { Component, Input, Output, OnInit, EventEmitter, ElementRef } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { SchemaKeysStoreService } from '../shared/services/schema-keys-store.service';
import { Observable } from 'rxjs';
import { Headers, Http } from '@angular/http';

@Component({
  selector: 'multi-editor',
  templateUrl: 'multi-editor.component.html',
  styleUrls: ['multi-editor.component.scss'],
})

export class MultiEditorComponent implements OnInit {
  currentPage = 1;
  records: Array<{}>;
  totalRecords: number;
  schema: {};
  query: string;
  queryUsed: string;
  myRecord = {}
  checkedRecords = [] //records that are different from the general selection rule
  allSelected = true
  previewMode = false
  newRecords: object[];
  collections: string[] = [
    'CDS',
    'HEP',
    'MARVEL'
  ];
  url = 'http://localhost:5000/multiedit/update'
  constructor(private apiService: ApiService,
    private schemaKeysStoreService: SchemaKeysStoreService,
    private http: Http) { }

  ngOnInit() {
    this.newRecords = []
    Observable.zip(
      this.apiService.fetchUrl(`http://localhost:5000/api/multieditor/search?page_num=1&query_string=''`),
      this.apiService.fetchUrl('../../assets/schema.json'),//fixme schema needs to be fetched from the records or collections
      (records, schema) => {
        return {
          records: records,
          schema: schema
        }
      }
    ).subscribe(data => {
      this.records = data.records['json_records'];
      this.totalRecords = data.records['total_records'];
      this.schema = data.schema;
      this.schemaKeysStoreService.buildSchemaKeyStore(this.schema);
    });
  }
  onSubmit(event) {
    let result
    this.http
      .post(this.url, event)
      .map(res => res.json())
      .toPromise()
      .then((res) =>{ 
        this.newRecords = res;
        this.previewMode = true;
      })
      .catch(this.handleError);
  }

  private addChecked(count: number) {
    if (this.checkedRecords.includes(count)) {
      this.checkedRecords.splice(this.checkedRecords.indexOf(count), 1)
    }
    else {
      this.checkedRecords.push(count)
    }
  }
  
  private selectAll(){
    this.allSelected = true
    this.checkedRecords = []
  }

  private deselectAll(){
    this.allSelected = false
    this.checkedRecords = []
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private pageChanged($event){
    this.http
    .get(`http://localhost:5000/api/multieditor/search?page_num=${$event.page}&query_string=${this.queryUsed}`)
    .map(res => res.json())
    .toPromise()
    .then((res) =>{ 
      this.records = res['json_records'];
    })
    .catch(this.handleError);
  }

  private searchRecords(){
    this.queryUsed = this.query
    this.http
    .get(`http://localhost:5000/api/multieditor/search?page_num=${this.currentPage}&query_string=${this.query}`)
    .map(res => res.json())
    .toPromise()
    .then((res) =>{ 
      this.records = res['json_records'];
      this.totalRecords = res['total_records']
    })
    .catch(this.handleError);
  }
}





