import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SchemaKeysStoreService } from '../shared/services/schema-keys-store.service';
import { Action } from '../shared/interfaces';
import { AppGlobalsService } from '../shared/services';

@Component({
  selector: 'me-addition-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.scss']
})
export class AddActionComponent {
  @Input() action: Action;
  isEditorVisible = false;
  isInputField = false;
  subSchema: object;
  record = {};

  constructor(private schemaKeysStoreService: SchemaKeysStoreService) {}

  saveRecord(record: object) {
    // if user is adding a premitive key return only the value
    this.action.value = this.subSchema['alwaysShow'] ? record[Object.keys(record)[0]] : record;
  }

  closeEditor() {
    this.isEditorVisible = false;
    this.action.mainKey = '';
    this.action.value = {};
  }

  onValueChange(value: string) {
    this.action.mainKey = value;
    this.subSchema = this.schemaKeysStoreService.findSubschema(this.action.mainKey);
    this.action.value = {};
  }

  openEditor() {
    this.isEditorVisible = true;
  }
}
