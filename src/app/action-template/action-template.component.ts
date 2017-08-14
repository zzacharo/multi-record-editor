import { Component, OnInit } from '@angular/core';
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
  editor = false;
  replaceValue;
  whereKey;
  subSchema = {}
  whereValue;
  value;
  myRecord = {}
  constructor(private schemaKeysStoreService: SchemaKeysStoreService) { }
  ngOnInit() {
  }

 SubmitAction()
  {  let action: Object = {
    selectedAction: this.selectedAction,
    mainKey:this.mainKey,
    value:this.value,
    updateValue:this.replaceValue,
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
}
