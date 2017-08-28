import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SchemaKeysStoreService } from '../shared/services/schema-keys-store.service';

@Component({
  selector: 'action-template',
  templateUrl: './action-template.component.html',
  styleUrls: ['./action-template.component.scss']
})

export class ActionTemplateComponent implements OnInit {
  actions = ['Addition','Deletion','Update']
  selectedAction;
  mainKey='';
  updateRegex: boolean;
  whereRegex: boolean;
  editor = false;
  replaceValue;
  whereKey;
  subSchema = {}
  whereValue;
  value;
  myRecord = {}
  @Output() onElementDeleted: EventEmitter<any> = new EventEmitter();
  @Input() id;
  constructor(private schemaKeysStoreService: SchemaKeysStoreService) { }
  ngOnInit() {
  }

 SubmitAction()
  {  let action: Object = {
    selectedAction: this.selectedAction,
    mainKey:this.mainKey,
    whereRegex:this.whereRegex,
    value:this.value,
    updateValue:this.replaceValue,
    updateRegex:this.updateRegex,
    whereKey:this.whereKey,
    whereValue:this.whereValue
  }
      return action;
  }

  saveRecord(event){
    this.myRecord = event;
  }
  getSubschema(path: string){
    return this.schemaKeysStoreService.find_subschema(this.mainKey)
  }
  showEditor(){
    this.editor = true
  }

  deleteElement() {
    this.onElementDeleted.emit(this.id);
  }
}
