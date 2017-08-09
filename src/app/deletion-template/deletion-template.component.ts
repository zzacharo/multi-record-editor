import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Action} from '../shared/interfaces';
import { AppGlobalsService } from '../shared/services';

@Component({
  selector: 'me-deletion-template',
  templateUrl: './deletion-template.component.html',
  styleUrls: ['./deletion-template.component.scss']
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
