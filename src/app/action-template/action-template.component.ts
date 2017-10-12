import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Action } from '../shared/interfaces';

@Component({
  selector: 'me-action-template',
  templateUrl: './action-template.component.html',
  styleUrls: ['./action-template.component.scss']
})

export class ActionTemplateComponent {
  @Input() action: Action;

  trackByFunction(index: number): number {
    return index;
  }

}
