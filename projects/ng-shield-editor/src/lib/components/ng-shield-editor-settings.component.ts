import {Component, forwardRef} from '@angular/core';
import {NgShieldSettings} from '../ng-shield-settings';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {noop} from 'rxjs';

@Component({
  selector: 'ng-shield-editor-settings',
  template: `
    <mat-tab-group>
      <mat-tab label="Forma" i18n-label>
        <ng-shield-editor-settings-shape [(ngModel)]="settings" (ngModelChange)="onChangeCallback($event)"></ng-shield-editor-settings-shape>
      </mat-tab>
      <mat-tab label="Motivo" i18n-label>
        <ng-shield-editor-settings-motif [(ngModel)]="settings" (ngModelChange)="onChangeCallback($event)"></ng-shield-editor-settings-motif>
      </mat-tab>
      <mat-tab label="Símbolo" i18n-label>
        <ng-shield-editor-settings-symbol [(ngModel)]="settings" (ngModelChange)="onChangeCallback($event)"></ng-shield-editor-settings-symbol>
      </mat-tab>
      <mat-tab label="Texto" i18n-label>
        <ng-shield-editor-settings-text [(ngModel)]="settings" (ngModelChange)="onChangeCallback($event)"></ng-shield-editor-settings-text>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: [
    `
      /* Fix for Material tabs overflow bug */
      :host ::ng-deep .mat-tab-body-content {
        overflow: hidden;
      }
    `
  ],
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

  public registerOnTouched(fn: any): void {
  }

  public writeValue(obj: any): void {
    this.settings = obj;
  }
}
