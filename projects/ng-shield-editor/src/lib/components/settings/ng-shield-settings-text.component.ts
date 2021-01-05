import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgShieldSettings} from '../../ng-shield-settings';
import {noop} from 'rxjs';
import {NgShieldTextService} from '../../services/ng-shield-text.service';

@Component({
  selector: 'ng-shield-editor-settings-text',
  template: `
    <ng-container *ngIf="settings?.text">
      <div class="flex">
        <label>
          <ng-container i18n>Texto</ng-container>
          <input type="text" [(ngModel)]="settings.text.body" (ngModelChange)="onChange()"/>
        </label>

        <label>
          <ng-container i18n>Fuente</ng-container>
          <select [(ngModel)]="settings.text.fontFamily" [compareWith]="isSameFont" (ngModelChange)="onChange()" [disabled]="!settings.text.body">
            <option *ngFor="let family of textSvc.fontFamilies" [ngValue]="family">{{ family.name }}</option>
          </select>
        </label>
      </div>

      <div class="flex">
        <label>
          <ng-container i18n>Tamaño</ng-container>
          <mat-slider [(ngModel)]="settings.text.size" (input)="settings.text.size = $event.value; onChange()"
                      [disabled]="!settings.text.body" [min]="1" [max]="10" [thumbLabel]="true"></mat-slider>
        </label>

        <label>
          <ng-container i18n>Forma</ng-container>
          <select [(ngModel)]="settings.text.path" (ngModelChange)="onChange()" [disabled]="!settings.text.body">
            <option [ngValue]="null" i18n>Ninguna</option>
            <option *ngFor="let path of textSvc.paths | keyvalue: originalOrder" [ngValue]="path.key">{{ path.key }}</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          <ng-container i18n>Color</ng-container>
          <color-picker [(ngModel)]="settings.text.color" (ngModelChange)="onChange()" [disabled]="!settings.text.body"></color-picker>
        </label>
      </div>

      <div class="flex">
        <label>
          <ng-container i18n>Posición horizontal</ng-container>
          <mat-slider [(ngModel)]="settings.text.x" (input)="settings.text.x = $event.value; onChange()"
                      [disabled]="!settings.text.body" [min]="0" [max]="100" [thumbLabel]="true"></mat-slider>
        </label>
        <label>
          <ng-container i18n>Posición vertical</ng-container>
          <mat-slider [(ngModel)]="settings.text.y" (input)="settings.text.y = $event.value; onChange()"
                      [disabled]="!settings.text.body" [min]="0" [max]="100" [thumbLabel]="true"></mat-slider>
        </label>
      </div>

      <hr/>

      <div>
        <label>
          <ng-container i18n>Borde</ng-container>
          <color-picker [(ngModel)]="settings.text.borderColor" (ngModelChange)="onChange()"
                        [allowNullSelection]="true" [disabled]="!settings.text.body"></color-picker>
        </label>

        <label *ngIf="settings.text.borderColor">
          <ng-container i18n>Tamaño</ng-container>
          <mat-slider [(ngModel)]="settings.text.borderSize" (input)="settings.text.borderSize = $event.value; onChange()"
                      [min]="1" [max]="8" [thumbLabel]="true" [disabled]="!settings.text.body"></mat-slider>
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

    .flex {
      display: flex;
    }

    .flex * {
      flex-grow: 1;
      display: flex;
      align-items: center;
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
    this.settings = {...this.settings}; // Realizar copia superficial del objeto para que el detector de cambios pueda detectar el cambio
    this._onChangeCallback(this.settings);
  }

  public isSameFont(fontA, fontB): boolean {
    return fontA && fontB && fontA.name == fontB.name;
  }

  public originalOrder() {
    return 0;
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
