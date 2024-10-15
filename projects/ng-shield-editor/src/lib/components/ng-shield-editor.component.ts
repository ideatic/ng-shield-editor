import {ChangeDetectionStrategy, Component, inject, Input, output} from "@angular/core";
import {NgShieldSettings} from '../ng-shield-settings';
import {NgShieldBuilderService} from '../services/ng-shield-builder.service';
import {imports} from "./imports";
import {NgShieldEditorMaterialStylesComponent} from "./ng-shield-editor-material-styles.component";
import {NgShieldEditorPreviewComponent} from "./ng-shield-editor-preview.component";
import {NgShieldEditorSettingsComponent} from "./ng-shield-editor-settings.component";

@Component({
    selector: 'ng-shield-editor',
    changeDetection: ChangeDetectionStrategy.OnPush,
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
  // Deps
  private _ngShieldSvc = inject(NgShieldBuilderService);

  // Bindings
  @Input() public settings: NgShieldSettings = JSON.parse(JSON.stringify(this._ngShieldSvc.defaultSettings)); // Crear copia para no editar la instancia original
  @Input() public showPreview = true;
  public readonly settingsChange = output<NgShieldSettings>();

  public render(width: number, height: number, type = 'image/png'): Promise<string> {
    return this._ngShieldSvc.renderBase64Image(this.settings, width, height, type);
  }
}
