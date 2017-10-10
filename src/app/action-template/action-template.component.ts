import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Action } from '../shared/interfaces';

@Component({
  selector: 'me-action-template',
  templateUrl: './action-template.component.html',
  styleUrls: ['./action-template.component.scss']
})

export class ActionTemplateComponent {
  @Input() id: number;
  @Input() action: Action;

  @Output() onActionDeleted = new EventEmitter<number>();

  constructor() { }

  onRemoveClick() {
    this.onActionDeleted.emit(this.id);
  }

  trackByFunction(index: number): number {
    return index;
  }

}
