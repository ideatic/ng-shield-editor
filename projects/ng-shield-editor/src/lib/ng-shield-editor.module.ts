import {NgModule} from '@angular/core';
import {NgShieldEditorComponent} from './components/ng-shield-editor.component';
import {NgShieldEditorPreviewComponent} from './components/ng-shield-editor-preview.component';
import {NgShieldEditorSettingsComponent} from './components/ng-shield-editor-settings.component';
import {MatTabsModule} from '@angular/material/tabs';
import {NgShieldBuilderService} from './services/ng-shield-builder.service';
import {ColorPickerComponent} from './components/ui/color-picker.component';
import {FormsModule} from '@angular/forms';
import {NgShieldSettingsShapeComponent} from './components/settings/ng-shield-settings-shape.component';
import {NgShieldSettingsMotifComponent} from './components/settings/ng-shield-settings-motif.component';
import {FnPipe} from './components/ui/fn.pipe';
import {CommonModule} from '@angular/common';
import {NgShieldShapeService} from './services/ng-shield-shape.service';
import {NgShieldMotifService} from './services/ng-shield-motif.service';
import {NgShieldSettingsTextComponent} from './components/settings/ng-shield-settings-text.component';
import {NgShieldTextService} from './services/ng-shield-text.service';
import {NgShieldSettingsSymbolComponent} from './components/settings/ng-shield-settings-symbol.component';
import {NgShieldSymbolService} from './services/ng-shield-symbol.service';
import {ImageToolService} from './services/image-tool.service';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatButtonModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatInputModule,
  ],
  providers: [
    NgShieldBuilderService,
    NgShieldShapeService,
    NgShieldMotifService,
    NgShieldSymbolService,
    NgShieldTextService,
    ImageToolService
  ],
  declarations: [
    NgShieldEditorComponent,
    NgShieldEditorPreviewComponent,
    NgShieldEditorSettingsComponent,
    NgShieldSettingsShapeComponent,
    NgShieldSettingsMotifComponent,
    NgShieldSettingsTextComponent,
    NgShieldSettingsSymbolComponent,

    // UI helpers
    ColorPickerComponent,
    FnPipe
  ],
  exports: [
    NgShieldEditorComponent,
    NgShieldEditorPreviewComponent,
    NgShieldEditorSettingsComponent
  ]
})
export class NgShieldEditorModule {
  // Services
  public readonly NgShieldEditorService = NgShieldBuilderService;
  public readonly NgShieldShapeService = NgShieldShapeService;
  public readonly NgShieldMotifService = NgShieldMotifService;
  public readonly NgShieldSymbolService = NgShieldSymbolService;

  // Components
  public readonly NgShieldEditorComponent = NgShieldEditorComponent;
  public readonly NgShieldEditorPreviewComponent = NgShieldEditorPreviewComponent;
  public readonly NgShieldEditorSettingsComponent = NgShieldEditorSettingsComponent;
}
