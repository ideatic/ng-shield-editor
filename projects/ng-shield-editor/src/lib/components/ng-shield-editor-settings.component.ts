import { Component, model } from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import type { NgShieldSettings } from '../ng-shield-settings';
import { imports } from './imports';
import { NgShieldSettingsPatternComponent } from './settings/ng-shield-settings-pattern.component';
import { NgShieldSettingsShapeComponent } from './settings/ng-shield-settings-shape.component';
import { NgShieldSettingsSymbolComponent } from './settings/ng-shield-settings-symbol.component';
import { NgShieldSettingsTextComponent } from './settings/ng-shield-settings-text.component';

@Component({
  selector: 'ng-shield-editor-settings',
  imports: [imports, NgShieldSettingsShapeComponent, NgShieldSettingsPatternComponent, NgShieldSettingsSymbolComponent, NgShieldSettingsTextComponent],
  template: `
    <mat-tab-group>
      <mat-tab label="Forma" i18n-label="shape|Referido a la forma geométrica de un objeto">
        <ng-shield-editor-settings-shape [(ngModel)]="value" />
      </mat-tab>
      <mat-tab label="Motivo" i18n-label="pattern|Referido al patrón de diseño aplicado a un objeto">
        <ng-template matTabContent>
          <ng-shield-editor-settings-pattern [(ngModel)]="value" />
        </ng-template>
      </mat-tab>
      <mat-tab label="Símbolo" i18n-label>
        <ng-template matTabContent>
          <ng-shield-editor-settings-symbol [(ngModel)]="value" />
        </ng-template>
      </mat-tab>
      <mat-tab label="Texto" i18n-label>
        <ng-template matTabContent>
          <ng-shield-editor-settings-text [(ngModel)]="value" />
        </ng-template>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: `
    /* Fix for Material tabs overflow bug */
    :host ::ng-deep .mat-mdc-tab-body-content {
      overflow: hidden;
    }
  `
})
export class NgShieldEditorSettingsComponent implements FormValueControl<NgShieldSettings | null> {
  public readonly value = model<NgShieldSettings | null>(null);
}
