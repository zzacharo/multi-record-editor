import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MultiEditorComponent } from './multi-editor';
import { SHARED_SERVICES } from './shared';

@NgModule({
  declarations: [
    AppComponent,
    MultiEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    SHARED_SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
