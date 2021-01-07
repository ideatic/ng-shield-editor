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
        <label class="block">
          <mat-form-field>
            <mat-label i18n>Texto</mat-label>
            <input matInput [(ngModel)]="settings.text.body" (ngModelChange)="onChange()">
          </mat-form-field>
        </label>

        <label class="block">
          <mat-form-field appearance="fill">
            <mat-label i18n>Fuente</mat-label>
            <mat-select [(ngModel)]="settings.text.fontFamily" [compareWith]="isSameFont" (ngModelChange)="onChange()" [disabled]="!settings.text.body">
              <mat-option *ngFor="let family of textSvc.fontFamilies" [value]="family" [style.font-family]="family.name">
                {{ family.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </label>
      </div>

      <div class="flex">
        <label class="block">
          <ng-container i18n>Tamaño</ng-container>
          <mat-slider [(ngModel)]="settings.text.size" (input)="settings.text.size = $event.value; onChange()"
                      [disabled]="!settings.text.body" [min]="1" [max]="10" [thumbLabel]="true"></mat-slider>
        </label>

        <label class="block">
          <mat-form-field appearance="fill">
            <mat-label i18n>Forma</mat-label>
            <mat-select [(ngModel)]="settings.text.path" (ngModelChange)="onChange()" [disabled]="!settings.text.body">
              <mat-option [value]="null" i18n>Ninguna</mat-option>
              <mat-option *ngFor="let path of textSvc.paths | keyvalue: originalOrder" [value]="path.key">
                {{ path.key }}
              </mat-option>
            </mat-select>
          </mat-form-field>
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

      <div>
        <label>
          <ng-container i18n>Espaciado de letras</ng-container>
          <mat-slider [(ngModel)]="settings.text.spacing" (input)="settings.text.spacing = $event.value; onChange()"
                      [disabled]="!settings.text.body" [min]="-25" [max]="50" [thumbLabel]="true"></mat-slider>
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
    `@import url('https://fonts.googleapis.com/css2?family=Bungee+Outline&family=Jura&family=Lobster&family=Luckiest+Guy&family=Nova+Flat&family=Open+Sans&family=Overpass&display=swap');
    
    div {
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

    .block * {
      flex: 1;
      display: block;
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
