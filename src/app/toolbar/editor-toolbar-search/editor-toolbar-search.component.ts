import { Component, Output, EventEmitter } from '@angular/core';
import { Collection } from '../../shared/interfaces';

@Component({
  selector: 'me-editor-toolbar-search',
  templateUrl: './editor-toolbar-search.component.html'
})
export class EditorToolbarSearchComponent {
  selectedCollection = 'hep';
  query = '';
  @Output() onSearchRecordClick = new EventEmitter<string>();
  @Output() onCollectionChange = new EventEmitter<string>();

  readonly collections: Collection[] = [
    { name: 'hep', value: 'Literature'},
    { name: 'authors', value: 'Authors'},
    { name: 'data', value: 'Data'},
    { name: 'conferences', value: 'Conferences'},
    { name: 'jobs', value: 'Jobs'},
    { name: 'institutions', value: 'Institutions'},
    { name: 'experiments', value: 'Experiments'},
    { name: 'journals', value: 'Journals'}
  ];

  _onSearchRecordClick(query) {
    this.onSearchRecordClick.emit(query);
  }

  _onCollectionChange(collection) {
    this.selectedCollection = collection;
    this.onCollectionChange.emit(collection);
  }
}
