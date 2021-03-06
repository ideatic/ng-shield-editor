import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgShieldBuilderService} from '../services/ng-shield-builder.service';
import {NgShieldSettings} from '../ng-shield-settings';

@Component({
  selector: 'ng-shield-editor',
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

  public render(size: number, type = 'image/png'): Promise<string> {
    return this._ngShieldSvc.renderBase64Image(this.settings, size, type);
  }
}
