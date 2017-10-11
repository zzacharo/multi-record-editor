import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MultiEditorComponent } from './multi-editor';
import { SHARED_SERVICES } from './shared';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ActionTemplateComponent} from './action-template';
import { ActionsTemplateComponent } from './actions-template/actions-template.component';
import { DiffViewComponent } from './diff-view/diff-view.component';
import { JsonEditorModule } from 'ng2-json-editor';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AdditionTemplateComponent } from './addition-template/addition-template.component';
import { DeletionTemplateComponent } from './deletion-template/deletion-template.component';
import { UpdateTemplateComponent } from './update-template/update-template.component';
import { ConditionsTemplateComponent } from './conditions-template/conditions-template.component';
import { EditorToolbarContainerComponent } from './editor-toolbar-container/editor-toolbar-container.component';
import { EditorToolbarSaveComponent } from './editor-toolbar-container/editor-toolbar-save/editor-toolbar-save.component';
import { EditorToolbarSearchComponent } from './editor-toolbar-container/editor-toolbar-search/editor-toolbar-search.component';

@NgModule({
  declarations: [
    AppComponent,
    MultiEditorComponent,
    ActionTemplateComponent,
    ActionsTemplateComponent,
    DiffViewComponent,
    AdditionTemplateComponent,
    DeletionTemplateComponent,
    UpdateTemplateComponent,
    ConditionsTemplateComponent,
    EditorToolbarContainerComponent,
    EditorToolbarSaveComponent,
    EditorToolbarSearchComponent,
  ],
  imports: [
    BsDropdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    JsonEditorModule,
    TypeaheadModule.forRoot()
  ],
  providers: [
    SHARED_SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
