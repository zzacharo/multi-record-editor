import {
  Component, Input, Output, OnInit, EventEmitter,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { SchemaKeysStoreService, QueryService } from '../shared/services';
import { UserActions } from '../shared/interfaces';


@Component({
  selector: 'me-multi-editor',
  templateUrl: 'multi-editor.component.html',
  styleUrls: ['multi-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MultiEditorComponent implements OnInit {
  @Input() records: object[];
  currentPage = 1;
  totalRecords = -1;
  schema: object;
  query = '';
  options: object;
  errorText: string;
  lastSearchedQuery = '';
  lastSearchedCollection: string;
  previewedActions: UserActions;
  // records that are different from the general selection rule
  checkedRecords: string[] = [];
  allSelected = true;
  previewMode = false;
  selectedCollection: string;
  newRecords: object[];
  uuids: string[] = [];
  filterExpression: string[];

  readonly collections: object[] = [
    ['hep', 'HEP'],
    ['authors', 'Authors'],
    ['data', 'Data'],
    ['conferences', 'Conferences'],
    ['jobs', 'Jobs'],
    ['institutions', 'Institutions'],
    ['experiments', 'Experiments'],
    ['journals', 'Journals']
  ];

  readonly pageSizes = [5, 10, 15, 20];
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
    this.queryService.submitActions(this.previewedActions, this.checkedRecords, this.allSelected)
      .catch((error) => {
        this.errorText = error;
      });
  }

  onPreview(userActions: UserActions) {
    this.previewedActions = userActions;
    this.queryService.previewActions(userActions, this.lastSearchedQuery, this.currentPage, this.pageSize)
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

  onPageChange(page: number) {
    this.currentPage = page;
    this.previewMode ? this.getNewPageRecords() : this.queryCollection(this.lastSearchedQuery, this.lastSearchedCollection);
  }

  searchRecords() {
    this.lastSearchedCollection = this.selectedCollection;
    if (!this.query) {
      this.query = '';
    }
    this.lastSearchedQuery = this.query;
    this.queryCollection(this.query, this.selectedCollection);
  }

  onCollectionChange(selectedCollection: string) {
    this.selectedCollection = selectedCollection;
    this.queryService.fetchCollectionSchema(this.selectedCollection)
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

  setPageSize(size: number) {
    this.pageSize = size;
    this.onPageChange(this.currentPage);
  }

  trackByFunction(index: number): number {
    return index;
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

  private getNewPageRecords() {
    this.queryService
      .fetchNewPageRecords(this.previewedActions, this.lastSearchedQuery, this.currentPage, this.lastSearchedCollection, this.pageSize)
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
      .then((json) => {
        this.records = json['json_records'];
        this.totalRecords = json['total_records'];
        this.uuids = json['uuids'];
        this.changeDetectorRef.markForCheck();
      })
      .catch(error => {
        this.errorText = error;
        this.changeDetectorRef.markForCheck();
      }
      );
  }

}


