import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {NgShieldEditorModule} from '../../projects/ng-shield-editor/src/lib/ng-shield-editor.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    BrowserModule,
    MatTabsModule,
    BrowserAnimationsModule,
    RouterModule,
    NgShieldEditorModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
