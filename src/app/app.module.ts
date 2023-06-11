import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignupPageComponent } from './components/pages/signup/signup-page.component';
import { SignupFormComponent } from './components/forms/signup/signup-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupPageComponent,
    SignupFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
