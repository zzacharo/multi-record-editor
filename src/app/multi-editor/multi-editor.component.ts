/*
 * This file is part of ng2-multi-record-editor.
 * Copyright (C) 2017 CERN.
 *
 * record-editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * record-editor is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with record-editor; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.
 * In applying this license, CERN does not
 * waive the privileges and immunities granted to it by virtue of its status
 * as an Intergovernmental Organization or submit itself to any jurisdiction.
 */

import {
  Component, Input, Output, OnInit, EventEmitter,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { SchemaKeysStoreService, QueryService, JsonUtilsService, UserActionsService } from '../shared/services';
import { UserActions } from '../shared/interfaces';
import { Set } from 'immutable';

@Component({
  selector: 'me-multi-editor',
  templateUrl: 'multi-editor.component.html',
  styleUrls: ['multi-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiEditorComponent implements OnInit {
  records: object[];
  currentPage = 1;
  totalRecords = -1;
  pageSize = 10;
  schema: object;
  validationErrors: string[];
  lastSearchedQuery = '';
  allSelected = true;
  lastSearchedCollection: string;
  previewedActions: UserActions;
  errorMessage: string;
  successMessage: string;
  recordSelectionStatus: { [uuid: string]: boolean } = {};
  previewMode = false;
  selectedCollection: string;
  newRecords: object[];
  uuids: string[] = [];
  filterExpressions: Set<string>;

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


  constructor(
    private schemaKeysStoreService: SchemaKeysStoreService,
    private changeDetectorRef: ChangeDetectorRef,
    private queryService: QueryService,
    private userActionsService: UserActionsService,
    private jsonUtilsService: JsonUtilsService) { }

  ngOnInit() {
    this.newRecords = [];
    this.selectedCollection = this.collections[0][0];
    this.onCollectionChange('hep');
  }

  onSave() {
    let uuids = Object.keys(this.recordSelectionStatus)
      .filter(key => this.recordSelectionStatus[key] !== this.allSelected);
    this.queryService.save(this.previewedActions, uuids, this.allSelected)
      .then((res) => {
        this.successMessage = res.message;
        this.totalRecords = -1;
        this.changeDetectorRef.markForCheck();
      })
      .catch((error) => {
        if (error.json().message) {
          this.totalRecords = -1;
          this.errorMessage = error.json().message;
        } else {
          this.errorMessage = error;
        }
        this.changeDetectorRef.markForCheck();
      });
  }

  selectAll() {
    this.allSelected = true;
    Object.keys(this.recordSelectionStatus)
      .forEach((item) => { this.recordSelectionStatus[item] = true; });
    this.changeDetectorRef.markForCheck();
  }

  deselectAll() {
    this.allSelected = false;
    Object.keys(this.recordSelectionStatus)
      .forEach((item) => { this.recordSelectionStatus[item] = false; });
    this.changeDetectorRef.markForCheck();
  }

  private setSelectionStatusesForNewPageRecords() {
    if (!this.recordSelectionStatus.hasOwnProperty(this.uuids[0])) {
      this.uuids.forEach(item => {
        this.recordSelectionStatus[item] = this.allSelected;
      });
    }
  }

  get userActions(): UserActions {
    return this.userActionsService.getUserActions();
  }

  onPreviewClick() {
    this.previewedActions = this.userActions;
    this.queryService.previewActions(this.userActions, this.lastSearchedQuery, this.currentPage, this.pageSize)
      .then((res) => {
        this.errorMessage = undefined;
        this.newRecords = res.json_records;
        this.validationErrors = res.errors;
        this.previewMode = true;
        this.changeDetectorRef.markForCheck();
      })
      .catch((error) => {
        if (error.json().message) {
          this.totalRecords = -1;
          this.errorMessage = error.json().message;
        } else {
          this.errorMessage = error;
        }
        this.changeDetectorRef.markForCheck();
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.previewMode ? this.getBundledRecords() : this.queryCollection(this.lastSearchedQuery, this.lastSearchedCollection);
  }

  searchRecords(query: string) {
    this.lastSearchedCollection = this.selectedCollection;
    this.currentPage = 1;
    this.allSelected = true;
    this.previewMode = false;
    this.recordSelectionStatus = {};
    if (!query) {
      query = '';
    }
    this.lastSearchedQuery = query;
    this.queryCollection(query, this.selectedCollection);
  }

  private queryCollection(query: string, collection: string) {
    this.successMessage = undefined;
    this.errorMessage = undefined;
    this.queryService.searchRecords(query, this.currentPage, collection, this.pageSize)
      .toPromise()
      .then((json) => {
        this.previewMode = false;
        this.records = json.json_records;
        this.totalRecords = json.total_records;
        this.uuids = json.uuids;
        this.setSelectionStatusesForNewPageRecords();
        this.changeDetectorRef.markForCheck();
      })
      .catch(error => {
        if (error.json().message) {
          this.totalRecords = -1;
          this.errorMessage = error.json().message;
        } else {
          this.errorMessage = error;
        }
        this.changeDetectorRef.markForCheck();
      }
      );
  }

  onCollectionChange(selectedCollection: string) {
    this.selectedCollection = selectedCollection;
    this.queryService.fetchCollectionSchema(this.selectedCollection)
      .then(res => {
        this.errorMessage = undefined;
        this.schema = res;
        this.schemaKeysStoreService.buildSchemaKeyStore(this.schema);
      })
      .catch(error => {
        this.errorMessage = error;
        this.changeDetectorRef.markForCheck();
      }
      );
  }

  trackByFunction(index: number): number {
    return index;
  }

  private getBundledRecords() {
    this.queryService
      .fetchBundledRecords(this.lastSearchedQuery, this.currentPage, this.lastSearchedCollection, this.pageSize, this.previewedActions)
      .subscribe((json) => {
        this.records = json.oldRecords.json_records;
        this.errorMessage = undefined;
        this.uuids = json.oldRecords.uuids;
        this.setSelectionStatusesForNewPageRecords();
        this.newRecords = json.newRecords.json_records;
        this.validationErrors = json.newRecords.errors;
        this.changeDetectorRef.markForCheck();
      },
      error => {
        this.errorMessage = error;
        this.changeDetectorRef.markForCheck();
      });
  }

  filterRecord(record: object): object {
    if (this.filterExpressions && this.filterExpressions.size > 0) {
      return this.jsonUtilsService.filterObject(record, this.filterExpressions);
    }
    return record;
  }

  filterRecords(newFilterExpressionArray) {
    this.filterExpressions = newFilterExpressionArray;
    this.changeDetectorRef.markForCheck();
  }

}


