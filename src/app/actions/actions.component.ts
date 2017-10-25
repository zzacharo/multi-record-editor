import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionTemplateComponent } from '../action';
import { UserActions } from '../shared/interfaces';
import { AppGlobalsService, UserActionsService } from '../shared/services';

@Component({
  selector: 'me-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})

export class ActionsComponent implements OnInit {
  selectedAction = 'Addition';
  userActions: UserActions;

  constructor(
    private appGlobalsService: AppGlobalsService,
    private userActionsService: UserActionsService) { };

  ngOnInit() {
    this.userActions = this.userActionsService.getUserActions();
    this.userActionsService.addAction(this.selectedAction, this.actionMatchTypes[0]);
    this.userActionsService.addCondition(this.conditionMatchTypes[0]);
  }

  get actionMatchTypes(): string[] {
    return this.appGlobalsService.actionMatchTypes;
  }

  get conditionMatchTypes(): string[] {
    return this.appGlobalsService.conditionMatchTypes;
  }

  addAction() {
    this.userActionsService.addAction(this.selectedAction, this.actionMatchTypes[0]);
  }

  addCondition() {
    this.userActionsService.addCondition(this.conditionMatchTypes[0]);
  }

  onRemoveAction(index: number) {
    this.userActionsService.removeAction(index);
  }

  onRemoveCondition(index: number) {
    this.userActionsService.removeCondition(index);
  }

  onActionChange(actionType: string) {
    this.selectedAction = actionType;
    this.userActions.actions
      .forEach((value, index) => {
        this.userActions.actions[index].actionName = actionType;
      });
  }
}
