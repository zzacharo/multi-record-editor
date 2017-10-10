import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { diffJson, IDiffResult } from 'diff';

@Component({
  selector: 'me-diff-view',
  templateUrl: './diff-view.component.html',
  styleUrls: ['./diff-view.component.scss']
})
export class DiffViewComponent implements OnChanges {
  @Input() oldObject: object;
  @Input() newObject: object;
  diffObjects: IDiffResult[];
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['oldObject'] || changes['newObject']) {
      if (!this.newObject) {
        this.diffObjects = diffJson(this.oldObject, this.newObject);
      }
    }

  }
}
