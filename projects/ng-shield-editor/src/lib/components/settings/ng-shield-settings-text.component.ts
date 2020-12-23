import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgShieldSettings } from '../../ng-shield-settings';
import { noop } from 'rxjs';
import { NgShieldTextService } from '../../services/ng-shield-text.service';

@Component({
  selector: 'ng-shield-editor-settings-text',
  template: `
    <ng-container *ngIf="settings?.text">
      <div>
        <label>
          <ng-container i18n>Texto</ng-container>
          <input type="text" [(ngModel)]="settings.text.body" (ngModelChange)="onChange()"/>
        </label>
      </div>

      <div>
        <label>
          <ng-container i18n>Tamaño</ng-container>
          <select [(ngModel)]="settings.text.size" (ngModelChange)="onChange()">
            <option *ngFor="let size of [25,35,40,45,50,65,70,75,80,85,90,100,110]" [ngValue]="size">{{ size | number }}</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          <ng-container i18n>Color</ng-container>
          <color-picker [(ngModel)]="settings.text.color" (ngModelChange)="onChange()"></color-picker>
        </label>
      </div>

      <div>
        <label>
          <ng-container i18n>Fuente</ng-container>
          <select [(ngModel)]="settings.text.fontFamily" (ngModelChange)="onChange()">
            <option *ngFor="let family of textSvc.fontFamilies" [ngValue]="family">{{ family.name }}</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          <ng-container i18n>Borde</ng-container>
          <color-picker [(ngModel)]="settings.text.borderColor" (ngModelChange)="onChange()" [allowNullSelection]="true"></color-picker>
        </label>

        <label>
          <ng-container i18n>Tamaño</ng-container>
          <input type="number" [(ngModel)]="settings.text.borderSize" (ngModelChange)="onChange()"/>
        </label>
      </div>

      <div>
        <label>
          <ng-container i18n>Posición X</ng-container>
          <input type="number" [(ngModel)]="settings.text.offsetX" (ngModelChange)="onChange()"/>
        </label>
        <label>
          <ng-container i18n>Posición Y</ng-container>
          <input type="number" [(ngModel)]="settings.text.offsetY" (ngModelChange)="onChange()"/>
        </label>
      </div>

      <div>
        <label>
          <ng-container i18n>Forma</ng-container>
          <select [(ngModel)]="settings.text.path" (ngModelChange)="onChange()">
            <option [ngValue]="null" i18n>Ninguna</option>
            <option *ngFor="let path of textSvc.paths | keyvalue" [ngValue]="path.key">{{ path.key }}</option>
          </select>
        </label>
      </div>
    </ng-container>
  `,
  styles: [
    `div {
      margin: 10px 0;
    }

    label {
      margin: 0 5px;
    }
    `
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgShieldSettingsTextComponent),
    multi: true
  }]
})
export class NgShieldSettingsTextComponent implements ControlValueAccessor {
  public settings: NgShieldSettings;
  private _onChangeCallback: (v: any) => void = noop;

  constructor(public textSvc: NgShieldTextService) {
  }

  public onChange() {
    this.settings = { ...this.settings }; // Realizar copia superficial del objeto para que el detector de cambios pueda detectar el cambio
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

    if (this.settings) {
      this.settings.text.fontFamily ??= this.textSvc.fontFamilies[0];
    }
  }
}
