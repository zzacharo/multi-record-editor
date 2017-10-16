import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Action} from '../shared/interfaces';
import { AppGlobalsService } from '../shared/services';

@Component({
  selector: 'me-delete-action',
  templateUrl: './delete-action.component.html',
  styleUrls: ['./delete-action.component.scss']
})

export class DeletionTemplateComponent {
  @Input() action: Action;
  constructor(private appGlobalsService: AppGlobalsService) { }

  get matchTypes(): string[] {
    return this.appGlobalsService.matchTypes;
  }

  trackByFunction(index: number): number {
    return index;
  }
}
