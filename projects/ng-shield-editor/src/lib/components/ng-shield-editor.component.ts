import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgShieldBuilderService} from '../services/ng-shield-builder.service';
import {NgShieldSettings} from '../ng-shield-settings';
import {imports} from "./imports";
import {NgShieldEditorPreviewComponent} from "./ng-shield-editor-preview.component";
import {NgShieldEditorSettingsComponent} from "./ng-shield-editor-settings.component";
import {NgShieldEditorMaterialStylesComponent} from "./ng-shield-editor-material-styles.component";

@Component({
  selector: 'ng-shield-editor',
  standalone: true,
  imports: [imports, NgShieldEditorPreviewComponent, NgShieldEditorSettingsComponent, NgShieldEditorMaterialStylesComponent],
  template: `
      @if (showPreview) {
          <ng-shield-editor-preview [settings]="settings"/>
      }
    <ng-shield-editor-settings [(ngModel)]="settings" (ngModelChange)="settingsChange.emit($event)"/>
    <ng-shield-editor-material-styles style="display: none"/>
  `,
  styles: `
  :host {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 50px;
  }

  ng-shield-editor-preview {
    max-width: 400px;
    flex: 50%;
  }

  ng-shield-editor-settings {
    max-width: 100%;
    flex: 50%;
  }
  `
})
export class NgShieldEditorComponent {
  @Input() public settings: NgShieldSettings = JSON.parse(JSON.stringify(this._ngShieldSvc.defaultSettings)); // Crear copia para no editar la instancia original
  @Input() public showPreview = true;
  @Output() public settingsChange = new EventEmitter<NgShieldSettings>();

  constructor(private _ngShieldSvc: NgShieldBuilderService) {
  }

  public render(width: number, height: number, type = 'image/png'): Promise<string> {
    return this._ngShieldSvc.renderBase64Image(this.settings, width, height, type);
  }
}
