import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'me-editor-toolbar-container',
  templateUrl: './editor-toolbar-container.component.html',
  styleUrls: ['./editor-toolbar-container.component.scss']
})
export class EditorToolbarContainerComponent {
  @Output() onSearchRecordClick = new EventEmitter<string>();
  @Output() onCollectionChange = new EventEmitter<string>();

  _onCollectionChange(collection) {
    this.onCollectionChange.emit(collection);
  }

  _onSearchRecordClick(query) {
    this.onSearchRecordClick.emit(query);
  }
}
