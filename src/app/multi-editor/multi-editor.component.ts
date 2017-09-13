import { Component, Input, Output, OnInit, EventEmitter, ElementRef, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { SchemaKeysStoreService } from '../shared/services/schema-keys-store.service';
import { Observable } from 'rxjs';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'multi-editor',
  templateUrl: 'multi-editor.component.html',
  styleUrls: ['multi-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MultiEditorComponent implements OnInit, OnChanges {
  currentPage = 1;
  @Input() records: Array<{}>;
  totalRecords = -1;
  schema: {};
  query: string;
  options: object;
  error_text: string;
  queryUsed: string;
  indexUsed: string;
  actionsUsed: Object[];
  checkedRecords = [] //records that are different from the general selection rule
  allSelected = true
  previewMode = false
  selectedCollection: string;
  newRecords: object[];
  uuids: string[] = []
  collections: object[] = [
    ['hep', 'HEP'],
    ['authors', 'Authors'],
    ['data', 'Data'],
    ['conferences', 'Conferences'],
    ['jobs', 'Jobs'],
    ['institutions', 'Institutions'],
    ['experiments', 'Experiments'],
    ['journals', 'Journals']
  ];
  url = 'http://localhost:5000/api/multieditor'
  constructor(private apiService: ApiService,
    private schemaKeysStoreService: SchemaKeysStoreService,
    private http: Http,
    private changeDetectorRef: ChangeDetectorRef) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Access-Control-Allow-Origin', 'localhost:4200');
    headers.append('Access-Control-Allow-Credentials', 'true');
  }

  ngOnInit() {
    this.newRecords = []
    this.selectedCollection = this.collections[0][0]
    this.searchRecords()
    this.setCollection('hep')
    document.cookie = "_pk_id.11.1fff=99911b90596f9e8d.1504879999.2.1505216503.1505216503.; _pk_ses.11.1fff=*"
    let headers = new Headers()
    this.createAuthorizationHeader(headers)
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    this.options = options
  }

  ngOnChanges(changes) {
    if (changes == 'previewMode') {
      console.log('gotcha')
    }
  }

  onSubmit(event) {
    this.http
      .post(`${this.url}/update`, {
        'userActions': event,
        'ids': this.checkedRecords,
        'allSelected': this.allSelected,
      },
      this.options
      )
      .map(res => res.json())
      .toPromise()
      .catch((error) => {
        this.error_text = error;
      });
  }

  onPreview(event: Object[]) {
    this.actionsUsed = event;
    this.http
      .post(`${this.url}/preview`, {
        'userActions': event,
        'queryString': this.queryUsed,
        'pageNum': this.currentPage
      },
      this.options
      )
      .map(res => res.json())
      .toPromise()
      .then((res) => {
        this.newRecords = res;
        this.previewMode = true;
        this.changeDetectorRef.markForCheck();
      })
      .catch((error) => {
        this.error_text = error;
        this.changeDetectorRef.markForCheck();
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
    this.currentPage = $event.page
    if (this.previewMode) {
      Observable.zip(
        this.http
          .get(`${this.url}/search?page_num=${$event.page}&query_string=${this.queryUsed}&index=${this.indexUsed}`, this.options)
          .map(res => res.json()),
        this.http
          .post(`${this.url}/preview`, {
            'userActions': this.actionsUsed,
            'queryString': this.queryUsed,
            'pageNum': this.currentPage
          },
          this.options
          )
          .map(res => res.json()),
        (oldRecords, newRecords) => {
          return {
            oldRecords: oldRecords,
            newRecords: newRecords
          }
        })
        .subscribe((json) => {
          this.records = json.oldRecords['json_records'],
          this.uuids = json.oldRecords['uuids'];
          this.newRecords = json.newRecords
          this.changeDetectorRef.markForCheck();
        },
        error => {this.error_text = error;this.changeDetectorRef.markForCheck();})
    }
    else {
      this.http
        .get(`${this.url}/search?page_num=${$event.page}&query_string=${this.queryUsed}&index=${this.indexUsed}`, this.options)
        .map(res => res.json())
        .toPromise()
        .then((res) => {
          this.records = res['json_records'],
          this.uuids = res['uuids'];
          this.changeDetectorRef.markForCheck();
        })
        .catch((error) => {
          this.error_text = error;
          this.changeDetectorRef.markForCheck();
        });//fixme insert if in preview mode
    }
  }

  private searchRecords() {
    this.indexUsed = this.selectedCollection
    if (!this.query) {
      this.query = ''
    }
    let headers = new Headers()
    this.createAuthorizationHeader(headers)
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    this.queryUsed = this.query
    this.http
      .get(`${this.url}/search?page_num=${this.currentPage}&query_string=${this.query}&index=${this.selectedCollection}`,
      options)
      .map(res => res.json())
      .toPromise()
      .then((res) => {
        this.records = res['json_records'];
        this.totalRecords = res['total_records']
        this.uuids = res['uuids']
        this.changeDetectorRef.markForCheck();
      })
      .catch(error =>
        {this.error_text = error;
        this.changeDetectorRef.markForCheck();
        }
      );
  }

  setCollection(selectedCollection: string) {
    let headers = new Headers()
    this.createAuthorizationHeader(headers)
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    this.selectedCollection = selectedCollection
    this.http
      .get(`http://localhost:5000/schemas/records/${this.selectedCollection}.json`, options)
      .map(res => res.json())
      .toPromise()
      .then((res) => {
        this.schema = res;
        this.schemaKeysStoreService.buildSchemaKeyStore(this.schema);
      })
      .catch(error =>
        {
          this.error_text = error
          this.changeDetectorRef.markForCheck();
        }
      );
  }
}


