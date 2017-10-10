import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionTemplateComponent } from '../action-template';
import { UserActions } from '../shared/interfaces';
import { AppGlobalsService } from '../shared/services';

@Component({
  selector: 'me-actions-template',
  templateUrl: './actions-template.component.html',
  styleUrls: ['./actions-template.component.scss']
})

export class ActionsTemplateComponent implements OnInit {
  userActions: UserActions;
  selectedAction = 'Addition';
  @Output() onPreview = new EventEmitter<UserActions>();

  constructor(private appGlobalsService: AppGlobalsService) { };

  ngOnInit() {
    this.addDefaultAction();
    this.addDefaultCondition();
  }
  get matchTypes(): string[] {
    return this.appGlobalsService.matchTypes;
  }

  addDefaultAction() {
    let action = {
      actionName: this.selectedAction,
      mainKey: '',
      value: '',
      updateValue: '',
      matchType: this.matchTypes[0]
    };
    this.userActions.actions.push(action);
  }

  addDefaultCondition() {
    let condition = {
      key: '',
      value: '',
      matchType: this.matchTypes[0]
    };
    this.userActions.conditions.push(condition);
  }

  onPreviewClick() {
    this.onPreview.emit(this.userActions);
  }

  onActionDeleted(id: number) {
    this.userActions.actions.splice(id, 1);
  }

  onConditionDeleted(id: number) {
    this.userActions.conditions.splice(id, 1);
  }

  onActionChange(actionType: string) {
    this.userActions.actions
      .forEach((value, index) => {
        this.userActions.actions[index].actionName = actionType;
      });
  }
}
