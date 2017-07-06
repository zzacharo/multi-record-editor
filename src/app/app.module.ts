import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppComponent } from './app.component';
import { MultiEditorComponent } from './multi-editor';
import { SHARED_SERVICES } from './shared';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { TagFilterPipe } from './shared/pipes/tag-filter.pipe';
import { MaterialChipsModule } from 'angular2-material-chips';

@NgModule({
  declarations: [
    AppComponent,
    MultiEditorComponent,
    AutocompleteComponent,
    TagFilterPipe
  ],
  imports: [
    BrowserModule,
    MaterialChipsModule,
    FormsModule,
    HttpModule,
    TypeaheadModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [
    SHARED_SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
