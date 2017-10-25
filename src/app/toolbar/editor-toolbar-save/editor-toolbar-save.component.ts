import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'me-editor-toolbar-save',
  templateUrl: './editor-toolbar-save.component.html',
  styleUrls: ['../../multi-editor/multi-editor.component.scss']
})
export class EditorToolbarSaveComponent {
  @Input() canSave: boolean;
  @Output() save = new EventEmitter<void>();

}
