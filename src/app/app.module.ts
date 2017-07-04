import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
<<<<<<< 911df6d69c20da94b647bd6352ca4fdabe87364f
import { AppComponent } from './app.component';
import { MultiEditorComponent } from './multi-editor';
import { SHARED_SERVICES } from './shared';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination'; 
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ActionTemplateComponent} from './action-template'
import { ActionsTemplateComponent } from './actions-template/actions-template.component';
import { DiffViewComponent } from './diff-view/diff-view.component';
import { JsonEditorModule } from 'ng2-json-editor';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';

@NgModule({
  declarations: [
    AppComponent,
    MultiEditorComponent,
    ActionTemplateComponent,
    ActionsTemplateComponent,
    DiffViewComponent,
    AutocompleteComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    JsonEditorModule
    TypeaheadModule.forRoot()
  ],
  providers: [
    SHARED_SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
