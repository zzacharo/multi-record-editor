import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Action } from '../shared/interfaces';

@Component({
  selector: 'me-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})

export class ActionTemplateComponent {
  @Input() action: Action;

  trackByFunction(index: number): number {
    return index;
  }

}
