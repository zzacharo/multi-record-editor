import { Component, OnInit, Input } from '@angular/core';
import { diffJson } from 'diff'

@Component({
  selector: 'diff-template',
  templateUrl: './diff-template.component.html',
  styleUrls: ['./diff-template.component.scss']
})
export class DiffTemplateComponent implements OnInit {
  @Input() oldObject: object;
  @Input() newObject: object;
  diff_objects;
  constructor() { }

  ngOnInit() {
    if (this.newObject != undefined) {
      this.diff_objects = diffJson(this.oldObject, this.newObject)
    }
  }

}
