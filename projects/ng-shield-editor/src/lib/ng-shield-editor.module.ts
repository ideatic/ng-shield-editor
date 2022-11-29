import {NgModule} from '@angular/core';
import {NgShieldEditorComponent} from './components/ng-shield-editor.component';
import {NgShieldEditorPreviewComponent} from './components/ng-shield-editor-preview.component';
import {NgShieldEditorSettingsComponent} from './components/ng-shield-editor-settings.component';
import {MatTabsModule} from '@angular/material/tabs';
import {NgShieldBuilderService} from './services/ng-shield-builder.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgShieldShapeService} from './services/ng-shield-shape.service';
import {NgShieldPatternService} from './services/ng-shield-pattern.service';
import {NgShieldTextService} from './services/ng-shield-text.service';
import {NgShieldSymbolService} from './services/ng-shield-symbol.service';
import {ImageToolService} from './services/image-tool.service';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

/** @deprecated */
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
    NgShieldPatternService,
    NgShieldSymbolService,
    NgShieldTextService,
    ImageToolService
  ]
})
export class NgShieldEditorModule {
  // Services
  public readonly NgShieldEditorService = NgShieldBuilderService;
  public readonly NgShieldShapeService = NgShieldShapeService;
  public readonly NgShieldPatternService = NgShieldPatternService;
  public readonly NgShieldSymbolService = NgShieldSymbolService;

  // Components
  public readonly NgShieldEditorComponent = NgShieldEditorComponent;
  public readonly NgShieldEditorPreviewComponent = NgShieldEditorPreviewComponent;
  public readonly NgShieldEditorSettingsComponent = NgShieldEditorSettingsComponent;
}
