import {ChangeDetectionStrategy, Component, forwardRef} from '@angular/core';
import {NgShieldSettings} from '../ng-shield-settings';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {noop} from 'rxjs';
import {imports} from "./imports";
import {NgShieldSettingsShapeComponent} from "./settings/ng-shield-settings-shape.component";
import {NgShieldSettingsPatternComponent} from "./settings/ng-shield-settings-pattern.component";
import {NgShieldSettingsSymbolComponent} from "./settings/ng-shield-settings-symbol.component";
import {NgShieldSettingsTextComponent} from "./settings/ng-shield-settings-text.component";

@Component({
  selector: 'ng-shield-editor-settings',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    imports,
    NgShieldSettingsShapeComponent,
    NgShieldSettingsPatternComponent,
    NgShieldSettingsSymbolComponent,
    NgShieldSettingsTextComponent
  ],
  template: `
    <mat-tab-group>
      <mat-tab label="Forma" i18n-label="shape|">
        <ng-shield-editor-settings-shape [(ngModel)]="settings" (ngModelChange)="onChangeCallback($event)"/>
      </mat-tab>
      <mat-tab label="Motivo" i18n-label="pattern|">
        <ng-template matTabContent>
          <ng-shield-editor-settings-pattern [(ngModel)]="settings" (ngModelChange)="onChangeCallback($event)"/>
        </ng-template>
      </mat-tab>
      <mat-tab label="Símbolo" i18n-label>
        <ng-template matTabContent>
          <ng-shield-editor-settings-symbol [(ngModel)]="settings" (ngModelChange)="onChangeCallback($event)"/>
        </ng-template>
      </mat-tab>
      <mat-tab label="Texto" i18n-label>
        <ng-template matTabContent>
          <ng-shield-editor-settings-text [(ngModel)]="settings" (ngModelChange)="onChangeCallback($event)"/>
        </ng-template>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: `
    /* Fix for Material tabs overflow bug */
    :host ::ng-deep .mat-mdc-tab-body-content {
      overflow: hidden;
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgShieldEditorSettingsComponent),
      multi: true
    }
  ]
})
export class NgShieldEditorSettingsComponent implements ControlValueAccessor {
  public settings: NgShieldSettings;
  public onChangeCallback: (v: any) => void = noop;

  /* ControlValueAccessor */
  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

    public registerOnTouched(): void {
    // No se utiliza
  }

  public writeValue(obj: any): void {
    this.settings = obj;
  }
}
