import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgShieldBuilderService} from '../services/ng-shield-builder.service';
import {NgShieldSettings} from '../ng-shield-settings';
import {imports} from "./imports";
import {NgShieldEditorPreviewComponent} from "./ng-shield-editor-preview.component";
import {NgShieldEditorSettingsComponent} from "./ng-shield-editor-settings.component";

@Component({
  selector: 'ng-shield-editor',
  standalone: true,
  imports: [imports, NgShieldEditorPreviewComponent, NgShieldEditorSettingsComponent],
  template: `
    <ng-shield-editor-preview *ngIf="showPreview" [settings]="settings"></ng-shield-editor-preview>
    <ng-shield-editor-settings [(ngModel)]="settings" (ngModelChange)="settingsChange.emit($event)"></ng-shield-editor-settings>
  `,
  styleUrls: ['ng-shield-editor.component.scss']
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
