import { NgModule } from '@angular/core';
import { NgShieldEditorComponent } from './components/ng-shield-editor.component';
import { NgShieldEditorPreviewComponent } from './components/ng-shield-editor-preview.component';
import { NgShieldEditorSettingsComponent } from './components/ng-shield-editor-settings.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgShieldEditorService } from './services/ng-shield-editor.service';
import { NgShieldSettingsColorComponent } from './components/settings/ng-shield-settings-color.component';
import { ColorPickerComponent } from './components/ui/color-picker.component';
import { FormsModule } from '@angular/forms';
import { NgShieldSettingsShapeComponent } from './components/settings/ng-shield-settings-shape.component';
import { NgShieldSettingsMotifComponent } from './components/settings/ng-shield-settings-motif.component';
import { FnPipe } from './components/ui/fn.pipe';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgShieldShapeService } from './services/ng-shield-shape.service';
import { NgShieldMotifService } from './services/ng-shield-motif.service';
import {NgShieldSettingsTextComponent} from './components/settings/ng-shield-settings-text.component';
import {NgShieldTextService} from './services/ng-shield-text.service';

@NgModule({
  imports: [BrowserModule, MatTabsModule, FormsModule, CommonModule],
  providers: [
    NgShieldEditorService,
    NgShieldShapeService,
    NgShieldMotifService,
    NgShieldTextService
  ],
  declarations: [
    NgShieldEditorComponent,
    NgShieldEditorPreviewComponent,
    NgShieldEditorSettingsComponent,
    NgShieldSettingsShapeComponent,
    NgShieldSettingsColorComponent,
    NgShieldSettingsMotifComponent,
    NgShieldSettingsTextComponent,

    // UI helpers
    ColorPickerComponent,
    FnPipe,
  ],
  exports: [
    NgShieldEditorComponent,
    NgShieldEditorPreviewComponent,
    NgShieldEditorSettingsComponent,
  ],
})
export class NgShieldEditorModule {}
