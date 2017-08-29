import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SchemaKeysStoreService } from '../shared/services/schema-keys-store.service';
import { Action } from '../actions-template/actions-template.component'

@Component({
  selector: 'action-template',
  templateUrl: './action-template.component.html',
  styleUrls: ['./action-template.component.scss']
})

export class ActionTemplateComponent implements OnInit {
  actionOptions = ['Addition', 'Deletion', 'Update']
  editor = false;
  subSchema = {}
  myRecord = {}
  @Output() onElementDeleted: EventEmitter<any> = new EventEmitter();
  @Input() id: number;
  @Input() action: Action;
  constructor(private schemaKeysStoreService: SchemaKeysStoreService) { }
  ngOnInit() {
    this.action.selectedAction = this.actionOptions[0]
  }

  saveRecord(event) {
    this.myRecord = event;
  }

  getSubschema(path: string) {
    return this.schemaKeysStoreService.find_subschema(this.action.mainKey)
  }

  showEditor() {
    this.editor = true
  }

  deleteElement() {
    this.onElementDeleted.emit(this.id);
  }
}
