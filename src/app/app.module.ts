import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AutoCompleteInputComponent } from './components/autocomplete-input/autocomplete-input.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AutoCompleteInputComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [ AutoCompleteInputComponent ]
})
export class AppModule { }
