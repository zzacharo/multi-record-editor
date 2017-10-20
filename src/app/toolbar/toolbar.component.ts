import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'me-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() canSave: boolean;
  @Output() onSearchRecordClick = new EventEmitter<string>();
  @Output() onCollectionChange = new EventEmitter<string>();
  @Output() save = new EventEmitter<void>();

  _onCollectionChange(collection) {
    this.onCollectionChange.emit(collection);
  }

  _onSearchRecordClick(query) {
    this.onSearchRecordClick.emit(query);
  }
}
