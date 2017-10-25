import { Injectable } from '@angular/core';
import { UserActions } from '../interfaces';

@Injectable()
export class UserActionsService {
  private userActions: UserActions = { actions: [], conditions: [] };

  addAction(selectedAction: string, matchType: string) {
    let action = {
      actionName: selectedAction,
      mainKey: '',
      value: '',
      updateValue: '',
      matchType: matchType
    };
    this.userActions.actions.push(action);
  }

  addCondition(matchType: string) {
    let condition = {
      key: '',
      value: '',
      matchType: matchType
    };
    this.userActions.conditions.push(condition);
  }

  removeAction(index: number) {
    this.userActions.actions.splice(index, 1);
  }

  removeCondition(index: number) {
    this.userActions.conditions.splice(index, 1);
  }

  getUserActions(): UserActions {
    return this.userActions;
  }
}
