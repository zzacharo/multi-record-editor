import { Component, Input, Output, OnInit, EventEmitter, ElementRef } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { SchemaKeysStoreService } from '../shared/services/schema-keys-store.service';
import { Observable } from 'rxjs';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'multi-editor',
  templateUrl: 'multi-editor.component.html',
  styleUrls: ['multi-editor.component.scss'],
})

export class MultiEditorComponent implements OnInit {
  currentPage = 1;
  records: Array<{}>;
  totalRecords = -1;
  schema: {};
  query: string;
  error = false;
  queryUsed: string;
  indexUsed: string;
  checkedRecords = [] //records that are different from the general selection rule
  allSelected = true
  previewMode = false
  selectedCollection: string;
  newRecords: object[];
  uuids: string[] = []
  collections: object[] = [
    ['hep','HEP'],
    ['authors','Authors'],
    ['data','Data'],
    ['conferences','Conferences'],
    ['jobs','Jobs'],
    ['institutions','Institutions'],
    ['experiments','Experiments'],
    ['journals','Journals']  
  ];
  url = 'http://localhost:5000/multiedit/update'
  constructor(private apiService: ApiService,
    private schemaKeysStoreService: SchemaKeysStoreService,
    private http: Http) { }

  ngOnInit() {
    this.newRecords = []
    this.selectedCollection = this.collections[0][0]
    this.searchRecords()
    this.setCollection()
  }

  onSubmit(event) {
    let result
    this.http
      .post(this.url, event)
      .map(res => res.json())
      .toPromise()
      .then((res) => {
        this.newRecords = res;
        this.previewMode = true;
      })
      .catch((error) => {
        this.error = true;
      });
  }

  private addChecked(count: number) {
    if (this.checkedRecords.includes(count)) {
      this.checkedRecords.splice(this.checkedRecords.indexOf(count), 1)
    }
    else {
      this.checkedRecords.push(count)
    }
  }

  private selectAll() {
    this.allSelected = true
    this.checkedRecords = []
  }

  private deselectAll() {
    this.allSelected = false
    this.checkedRecords = []
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private pageChanged($event) {
    this.http
      .get(`http://localhost:5000/api/multieditor/search?page_num=${$event.page}&query_string=${this.queryUsed}&index=${this.indexUsed}`)
      .map(res => res.json())
      .toPromise()
      .then((res) => {
        this.records = res['json_records'],
          this.uuids = res['uuids'];
      })
      .catch((error) => {
        this.error = true;
      });
  }

  private searchRecords() {
    this.setCollection();
    this.indexUsed = this.selectedCollection
    this.queryUsed = this.query
    this.http
      .get(`http://localhost:5000/api/multieditor/search?page_num=${this.currentPage}&query_string=${this.query}&index=${this.selectedCollection}`)
      .map(res => res.json())
      .toPromise()
      .then((res) => {
        this.records = res['json_records'];
        this.totalRecords = res['total_records']
        this.uuids = res['uuids']
      })
      .catch((error) => {
        this.error = true;
      });
  }

  setCollection(){
    this.http
    .get(`http://localhost:5000/schemas/records/${this.selectedCollection}.json`)
    .map(res => res.json())
    .toPromise()
    .then((res) => {
      this.schema = res;
      this.schemaKeysStoreService.buildSchemaKeyStore(this.schema);
    })
  }
}





