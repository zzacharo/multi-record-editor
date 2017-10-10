import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Action } from '../shared/interfaces';
import { AppGlobalsService } from '../shared/services';

@Component({
  selector: 'me-update-template',
  templateUrl: './update-template.component.html',
  styleUrls: ['./update-template.component.scss']
})
export class UpdateTemplateComponent {
  @Input() action: Action;
  constructor(private appGlobalsService: AppGlobalsService) { }

  get matchTypes(): string[] {
    return this.appGlobalsService.matchTypes;
  }

  trackByFunction(index: number): number {
    return index;
  }
}
