import { Component, OnInit, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { ActionTemplateComponent } from '../action-template'

export interface Action {
  selectedAction: string,
  mainKey: string,
  whereRegex: boolean,
  value: string,
  updateValue: string,
  updateRegex: boolean,
  whereKey: string,
  whereValue: string
}

@Component({
  selector: 'actions-template',
  templateUrl: './actions-template.component.html',
  styleUrls: ['./actions-template.component.scss']
})

export class ActionsTemplateComponent implements OnInit {
  //@ViewChildren(ActionTemplateComponent) actionComponents: QueryList<ActionTemplateComponent>;
  actions:Action [] = [];
  @Output() onSubmit: EventEmitter<Object> = new EventEmitter();

  constructor() { };
  ngOnInit() {
    this.increaseAction();
  }

  increaseAction() {
    let action : Action = {selectedAction: '',
    mainKey: '',
    whereRegex: false,
    value: '',
    updateValue: '',
    updateRegex: false,
    whereKey: '',
    whereValue: ''};
    this.actions.push(action);
  }

  submitActions() {
    var that = this;
    //this.actionComponents.forEach(SubmitInstance => that.actions.push(SubmitInstance.SubmitAction()));
    this.onSubmit.emit(this.actions);
    this.actions = []
  }

  onElementDeleted(event) {
      this.actions.splice(event, 1);
  }
}