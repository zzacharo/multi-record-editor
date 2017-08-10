import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'action-template',
  templateUrl: './action-template.component.html',
  styleUrls: ['./action-template.component.scss']
})

export class ActionTemplateComponent implements OnInit {
  actions = ['Addition','Deletion','Update']
  selectedAction;
  mainKey='';
  replaceValue;
  whereKey;
  whereValue;
  value;
  constructor() { }
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
}
