import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FormComponent } from './form.component';
import { PatternComponent } from './pattern.component';
import { SymbolComponent } from './symbol.component';
import { ColorComponent } from './color.component';

const appRoutes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'pattern', component: PatternComponent },
  { path: 'symbol', component: SymbolComponent },
  { path: 'color', component: ColorComponent },
  { path: '**', component: FormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    PatternComponent,
    SymbolComponent,
    ColorComponent,
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    BrowserAnimationsModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [MatTabsModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
