import { Component, OnInit, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { ActionTemplateComponent } from '../action-template';
import { Action, Condition } from '../shared/interfaces';
import { AppGlobalsService } from '../shared/services';

@Component({
  selector: 'me-actions-template',
  templateUrl: './actions-template.component.html',
  styleUrls: ['./actions-template.component.scss']
})

export class ActionsTemplateComponent implements OnInit {
  actions: Action[] = [];
  conditions: Condition[] = [];
  selectedAction: string;
  @Output() onPreview: EventEmitter<Object> = new EventEmitter();

  constructor(private appGlobalsService: AppGlobalsService) { };

  ngOnInit() {
    this.selectedAction = 'Addition';
    this.increaseAction();
    this.increaseCondition();
  }
  get matchTypes(): string[] {
    return this.appGlobalsService.matchTypes;
  }

  increaseAction() {
    let action: Action = {
      selectedAction: this.selectedAction,
      mainKey: '',
      value: '',
      updateValue: '',
      matchType: this.matchTypes[0]
    };
    this.actions.push(action);
  }

  increaseCondition() {
    let condition: Condition = {
      key: '',
      value: '',
      matchType: this.matchTypes[0]
    };
    this.conditions.push(condition);
  }

  previewActions() {
    this.onPreview.emit({ 'actions': this.actions, 'conditions': this.conditions });
  }

  onActionDeleted(id: number) {
    this.actions.splice(id, 1);
  }

  onConditionDeleted(id: number) {
    this.conditions.splice(id, 1);
  }

  onActionChange(actionType: string) {
    this.actions.forEach((value, index) => {
      this.actions[index].selectedAction = actionType;
    });
  }
}
