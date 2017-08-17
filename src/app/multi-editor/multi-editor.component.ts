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
  p = 1;
  records: Array<{}>;
  schema: {};
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
      this.apiService.fetchUrl('../../assets/records.json'),
      this.apiService.fetchUrl('../../assets/schema.json'),
      (records, schema) => {
        return {
          records: records,
          schema: schema
        }
      }
    ).subscribe(data => {
      this.records = data.records;
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
}





