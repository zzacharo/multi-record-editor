import { Component, Input, Output, OnInit, EventEmitter, ElementRef, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SchemaKeysStoreService } from '../shared/services/schema-keys-store.service';
import { QueryService } from '../shared/services/query.service'
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'multi-editor',
  templateUrl: 'multi-editor.component.html',
  styleUrls: ['multi-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MultiEditorComponent implements OnInit {
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
  schema_url = 'http://localhost:5000'
  constructor(
    private schemaKeysStoreService: SchemaKeysStoreService,
    private changeDetectorRef: ChangeDetectorRef,
    private queryService: QueryService) { }

  ngOnInit() {
    this.newRecords = []
    this.selectedCollection = this.collections[0][0]
    this.searchRecords()
    this.setCollection('hep')
    document.cookie = "_pk_id.11.1fff=99911b90596f9e8d.1504879999.2.1505216503.1505216503.; _pk_ses.11.1fff=*"
  }

  onSubmit(userActions:object[]) {
     this.queryService.submitActions(userActions, this.url, this.checkedRecords, this.allSelected)
      .catch((error) => {
        this.error_text = error;
      });
  }

  onPreview(userActions: Object[]) {
    this.actionsUsed = userActions;
    this.queryService.previewActions(userActions,this.url, this.queryUsed, this.currentPage)
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
      this.queryService.getNewPageRecords(this.actionsUsed, this.url, this.queryUsed, this.currentPage, this.indexUsed)  
        .subscribe((json) => {
          this.records = json.oldRecords['json_records'],
          this.uuids = json.oldRecords['uuids'];
          this.newRecords = json.newRecords
          this.changeDetectorRef.markForCheck();
        },
        error => {this.error_text = error;this.changeDetectorRef.markForCheck();})
    }
    else {
      this.queryService.searchRecords(this.url, this.queryUsed, this.currentPage, this.indexUsed)
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
    this.queryUsed = this.query
    this.queryService.searchRecords(this.url, this.query, this.currentPage, this.selectedCollection)      
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
    this.selectedCollection = selectedCollection
    this.queryService.getCollection(this.schema_url, this.selectedCollection)      
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

  identify(index) {
    return index;
  }
}


