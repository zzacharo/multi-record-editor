import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MultiEditorComponent } from './multi-editor';
import { SHARED_SERVICES } from './shared';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ActionTemplateComponent} from './action-template'
import { AdditionTemplateComponent } from './addition-template';
import { ActionsTemplateComponent } from './actions-template/actions-template.component';
import { DiffViewComponent } from './diff-view/diff-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MultiEditorComponent,
    ActionTemplateComponent,
    AdditionTemplateComponent,
    ActionsTemplateComponent,
    DiffViewComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [
    SHARED_SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
