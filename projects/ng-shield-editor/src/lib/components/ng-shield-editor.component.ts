import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgShieldEditorService} from '../services/ng-shield-editor.service';
import {NgShieldSettings} from '../ng-shield-settings';

@Component({
  selector: 'ng-shield-editor',
  template: `
    <ng-shield-editor-preview [settings]="settings"></ng-shield-editor-preview>
    <ng-shield-editor-settings [(ngModel)]="settings" (ngModelChange)="change.emit($event)"></ng-shield-editor-settings>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 50px;
      }

      ng-shield-editor-preview, ng-shield-editor-settings {
        flex: 50%;
      }
    `
  ]
})
export class NgShieldEditorComponent {
  @Input() public settings: NgShieldSettings = JSON.parse(JSON.stringify(this._ngShieldSvc.defaultSettings)); // Crear copia para no editar la instancia original
  @Output() public change = new EventEmitter<NgShieldSettings>();

  constructor(private _ngShieldSvc: NgShieldEditorService) {
  }

  public render(size: number, type = 'image/png'): Promise<string> {
    return this._ngShieldSvc.renderBase64Image(this.settings, size, type);
  }
}
