import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SchemaKeysStoreService } from '../shared/services/schema-keys-store.service';
import { Action } from '../shared'

@Component({
  selector: 'action-template',
  templateUrl: './action-template.component.html',
  styleUrls: ['./action-template.component.scss']
})

export class ActionTemplateComponent implements OnInit {
  actionOptions = ['Addition', 'Deletion', 'Update']
  isEditorVisible = false;
  subSchema = {}
  _myRecord = {}
  @Output() elementDeleted: EventEmitter<any> = new EventEmitter();
  @Input() id: number;
  @Input() action: Action;
  constructor(private schemaKeysStoreService: SchemaKeysStoreService) { }
  ngOnInit() {
    this.action.selectedAction = this.actionOptions[0];
  }

  saveRecord(event) {
     this.myRecord= event;
  }

  getSubschema() {
    return this.schemaKeysStoreService.find_subschema(this.action.mainKey);
  }

  showEditor() {
    this.isEditorVisible = true;
    this.action.value = this.myRecord;
  }

  addValue(targetArray:string[]) {
    targetArray.push('');
  }

  reduceValue(targetArray:string[]) {
    targetArray.pop();
  }

  deleteElement() {
    this.elementDeleted.emit(this.id);
  }

  identify(index:number){
    return index
  }

  closeEditor(){
    this.isEditorVisible = false;
  }

  get myRecord() {
    return this._myRecord;
  }

  set myRecord(record) {
    this._myRecord = record;
  }
}