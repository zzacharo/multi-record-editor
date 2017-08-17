import { Component, OnInit, Input } from '@angular/core';
import { diffJson } from 'diff'

@Component({
  selector: 'diff-view',
  templateUrl: './diff-view.component.html',
  styleUrls: ['./diff-view.component.scss']
})
export class DiffViewComponent implements OnInit {
  @Input() oldObject: object;
  @Input() newObject: object;
  diffObjects;
  constructor() { }

  ngOnInit() {
    if (this.newObject != undefined) {
      this.diffObjects = diffJson(JSON.parse(JSON.stringify(this.oldObject)), this.newObject)
    }
  }

}
