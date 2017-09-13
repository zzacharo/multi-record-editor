import { Component, OnInit, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { ActionTemplateComponent } from '../action-template'
import { Action } from '../shared'


@Component({
  selector: 'actions-template',
  templateUrl: './actions-template.component.html',
  styleUrls: ['./actions-template.component.scss']
})

export class ActionsTemplateComponent implements OnInit {
  //@ViewChildren(ActionTemplateComponent) actionComponents: QueryList<ActionTemplateComponent>;
  actions:Action [] = [];
  @Output() onPreview: EventEmitter<Object> = new EventEmitter();

  constructor() { };
  ngOnInit() {
    this.increaseAction();
  }

  increaseAction() {
    let action : Action = {selectedAction: '',
    mainKey: '',
    whereRegex: false,
    value: '',
    updateValues: [''],
    updateRegex: false,
    whereKey: '',
    whereValues: ['']};
    this.actions.push(action);
  }

  submitActions() {
    var that = this;
    //this.actionComponents.forEach(SubmitInstance => that.actions.push(SubmitInstance.SubmitAction()));
    this.onPreview.emit(this.actions);
  }

  elementDeleted(event) {
      this.actions.splice(event, 1);
  }
}