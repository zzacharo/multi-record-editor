import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Action } from '../shared/interfaces';
import { AppGlobalsService } from '../shared/services';

@Component({
  selector: 'me-update-action',
  templateUrl: './update-action.component.html',
  styleUrls: ['./update-action.component.scss']
})
export class UpdateActionComponent {
  @Input() action: Action;
  constructor(private appGlobalsService: AppGlobalsService) { }

  get matchTypes(): string[] {
    return this.appGlobalsService.matchTypes;
  }

  trackByFunction(index: number): number {
    return index;
  }
}
