import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Action } from '../shared/interfaces';

@Component({
  selector: 'me-action-template',
  templateUrl: './action-template.component.html',
  styleUrls: ['./action-template.component.scss']
})

export class ActionTemplateComponent {
  @Output() onActionDeleted = new EventEmitter<number>();
  @Input() id: number;
  @Input() action: Action;
  constructor() { }

  deleteElement() {
    this.onActionDeleted.emit(this.id);
  }

  trackByFunction(index: number): number {
    return index;
  }

}
