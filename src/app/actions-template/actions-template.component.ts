import { Component, OnInit, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { ActionTemplateComponent } from '../action-template'

@Component({
  selector: 'actions-template',
  templateUrl: './actions-template.component.html',
  styleUrls: ['./actions-template.component.scss']
})

export class ActionsTemplateComponent implements OnInit {
  @ViewChildren(ActionTemplateComponent) actionComponents: QueryList<ActionTemplateComponent>;
  numberOfActions = [1];
  curNumOfActions = 1;
  @Output()
  submit: EventEmitter<Object> = new EventEmitter();
  actions: object[] = [];
  constructor() { };
  ngOnInit() {
    this.numberOfActions = this.numberOfActions;
  }

  increaseAction() {
    this.curNumOfActions++;
    this.numberOfActions.push(this.curNumOfActions);
  }
  decreaseAction() {
    this.curNumOfActions++;
    this.numberOfActions.pop();
  }
  ngAfterViewInit() {

  }
  submitActions() {
    var that = this;
    this.actionComponents.forEach(SubmitInstance => that.actions.push(SubmitInstance.SubmitAction()));
    this.submit.emit(this.actions);
    this.actions = []
  }
}