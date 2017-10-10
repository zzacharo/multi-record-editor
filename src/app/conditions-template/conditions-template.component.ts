import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Condition } from '../shared/interfaces';
import { AppGlobalsService } from '../shared/services';

@Component({
  selector: 'me-conditions-template',
  templateUrl: './conditions-template.component.html',
  styleUrls: ['./conditions-template.component.scss']
})
export class ConditionsTemplateComponent {
  @Input() id: number;
  @Input() condition: Condition;
  @Output() onConditionDeleted = new EventEmitter<number>();
  constructor(private appGlobalsService: AppGlobalsService) { }

  get matchTypes(): string[] {
    return this.appGlobalsService.matchTypes;
  }

  deleteElement() {
    this.onConditionDeleted.emit(this.id);
  }

  trackByFunction(index: number): number {
    return index;
  }
}
