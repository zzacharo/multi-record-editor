import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SchemaKeysStoreService } from '../shared/services/schema-keys-store.service';
import { Action } from '../shared/interfaces';

@Component({
  selector: 'me-addition-template',
  templateUrl: './addition-template.component.html',
  styleUrls: ['./addition-template.component.scss']
})
export class AdditionTemplateComponent {
  @Input() action: Action;
  isEditorVisible = false;
  isInputField = false;
  subSchema: object;
  record = {};
  constructor(private schemaKeysStoreService: SchemaKeysStoreService) { }

  onEnterKeyUp() {
    this.subSchema = this.schemaKeysStoreService.findSubschema(this.action.mainKey);
    this.action.value = {};
    this.isEditorVisible = true;
  }

  saveRecord(record: object) {
    // if user is adding a premitive key return only the value
    this.action.value = this.subSchema['alwaysShow'] ? record[Object.keys(record)[0]] : record;
  }

  closeEditor() {
    this.isEditorVisible = false;
  }

}
