import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignupComponent } from './components/forms/signup/signup.component';
import { InputComponent } from './components/elements/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    InputComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
