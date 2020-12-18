import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgShieldSettings} from '../../ng-shield-settings';
import {noop} from 'rxjs';

@Component({
  selector: 'ng-shield-editor-settings-color',
  template: `
    <nav mat-tab-nav-bar>
      <mat-tab-group *ngIf="settings">
        <mat-tab label="Color 1" i18n-label>
          <color-picker [(ngModel)]="settings.color1" (ngModelChange)="onColorChange(settings)"></color-picker>
        </mat-tab>
        <mat-tab label="Color 2" i18n-label>
          <color-picker [(ngModel)]="settings.color2" (ngModelChange)="onColorChange(settings)"></color-picker>
        </mat-tab>
        <mat-tab label="Color 3" i18n-label>
          <color-picker [(ngModel)]="settings.color3" (ngModelChange)="onColorChange(settings)"></color-picker>
        </mat-tab>
      </mat-tab-group>
    </nav>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgShieldSettingsColorComponent),
    multi: true
  }]
})
export class NgShieldSettingsColorComponent implements ControlValueAccessor {
  public settings: NgShieldSettings;
  private _onChangeCallback: (v: any) => void = noop;


  public onColorChange(settings: NgShieldSettings) {
    this.settings = {...settings}; // Realizar copia superficial del objeto para que el detector de cambios pueda detectar el cambio
    this._onChangeCallback(this.settings);
  }

  /* ControlValueAccessor */
  public registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
  }

  public writeValue(obj: any): void {
    this.settings = obj;
  }
}
