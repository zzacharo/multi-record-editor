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
    this.userActionsService.addDefaultAction(this.selectedAction, this.matchTypes[0]);
    this.userActionsService.addDefaultCondition(this.matchTypes[0]);
  }

  get matchTypes(): string[] {
    return this.appGlobalsService.matchTypes;
  }

  addAction() {
    this.userActionsService.addDefaultAction(this.selectedAction, this.matchTypes[0]);
  }

  addCondition() {
    this.userActionsService.addDefaultCondition(this.matchTypes[0]);
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
