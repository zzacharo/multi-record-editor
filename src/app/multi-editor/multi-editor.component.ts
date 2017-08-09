import { Component, Input, Output, OnInit, EventEmitter,
   ElementRef, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SchemaKeysStoreService } from '../shared/services/schema-keys-store.service';
import { QueryService } from '../shared/services/query.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'me-multi-editor',
  templateUrl: 'multi-editor.component.html',
  styleUrls: ['multi-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MultiEditorComponent implements OnInit {
  @Input() records: Array<object>;
  currentPage = 1;
  totalRecords = -1;
  schema: {};
  query = '';
  options: object;
  errorText: string;
  queryUsed = '';
  indexUsed: string;
  actionsUsed: object[];
  checkedRecords: Array<string> = []; // records that are different from the general selection rule
  allSelected = true;
  previewMode = false;
  selectedCollection: string;
  newRecords: object[];
  uuids: string[] = [];
  filterExpression: Array<string>;
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

  pageSizes = [5, 10, 15, 20];
  pageSize = this.pageSizes[0];


  constructor(
    private schemaKeysStoreService: SchemaKeysStoreService,
    private changeDetectorRef: ChangeDetectorRef,
    private queryService: QueryService) { }

  ngOnInit() {
    this.newRecords = [];
    this.selectedCollection = this.collections[0][0];
    this.onCollectionChange('hep');
  }

  onSubmit() {
    this.queryService.submitActions(this.actionsUsed, this.checkedRecords, this.allSelected)
      .catch((error) => {
        this.errorText = error;
      });
  }

  onPreview(userActions: Object[]) {
    this.actionsUsed = userActions;
    this.queryService.previewActions(userActions, this.queryUsed, this.currentPage, this.pageSize)
      .then((res) => {
        this.newRecords = res;
        this.previewMode = true;
        this.changeDetectorRef.markForCheck();
      })
      .catch((error) => {
        this.errorText = error;
        this.changeDetectorRef.markForCheck();
      });
  }

  private addChecked(uuid: string) {
    this.checkedRecords.includes(uuid) ? this.checkedRecords.splice(this.checkedRecords.indexOf(uuid), 1)
     : this.checkedRecords.push(uuid);
  }

  private selectAll() {
    this.allSelected = true;
    this.checkedRecords = [];
  }

  private deselectAll() {
    this.allSelected = false;
    this.checkedRecords = [];
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private pageChanged(newPage: number) {
    this.currentPage = newPage;
    this.previewMode ? this.getNewPageRecords() : this.queryCollection(this.queryUsed, this.indexUsed);
  }

  private searchRecords() {
    this.indexUsed = this.selectedCollection;
    if (!this.query) {
      this.query = '';
    }
    this.queryUsed = this.query;
    this.queryCollection(this.query, this.selectedCollection);
  }

  private getNewPageRecords() {
    this.queryService.getNewPageRecords(this.actionsUsed, this.queryUsed, this.currentPage, this.indexUsed, this.pageSize)
    .subscribe((json) => {
      this.records = json.oldRecords['json_records'];
      this.uuids = json.oldRecords['uuids'];
      this.newRecords = json.newRecords;
      this.changeDetectorRef.markForCheck();
    },
    error => { this.errorText = error; this.changeDetectorRef.markForCheck(); });
  }

  private queryCollection(query, collection) {
    this.queryService.searchRecords(query, this.currentPage, collection, this.pageSize)
    .then((res) => {
      this.records = res['json_records'];
      this.totalRecords = res['total_records'];
      this.uuids = res['uuids'];
      this.changeDetectorRef.markForCheck();
    })
    .catch(error => {
      this.errorText = error;
      this.changeDetectorRef.markForCheck();
    }
    );
  }

  onCollectionChange(selectedCollection: string) {
    this.selectedCollection = selectedCollection;
    this.queryService.getCollection(this.selectedCollection)
      .then((res) => {
        this.schema = res;
        this.schemaKeysStoreService.buildSchemaKeyStore(this.schema);
      })
      .catch(error => {
        this.errorText = error;
        this.changeDetectorRef.markForCheck();
      }
      );
  }

  setPage(size: number) {
    this.pageSize = size;
    this.pageChanged(this.currentPage);
  }

  trackByFunction(index: number): number {
    return index;
  }
}


