import {Component, forwardRef, Inject} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgShieldSettings} from '../../ng-shield-settings';
import {noop} from 'rxjs';
import {NgShieldTextService} from '../../services/ng-shield-text.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'ng-shield-editor-settings-text',
  template: `
    <mat-form-field appearance="fill" class="select-label" *ngIf="settings?.text.length > 1">
      <mat-label i18n>Selecciona un texto</mat-label>
      <mat-select [(value)]="selected" [(ngModel)]="settings?.text.body" (ngModelChange)="onChange()">
        <mat-option *ngFor="let text of (settings?.text || []); index as index" value="{{ index }}">
          <ng-container i18n>Texto</ng-container>
          #{{ index + 1 | number }}
        </mat-option>
      </mat-select>
    </mat-form-field>

    

      <div class="flex">
        <label class="block">
          <mat-form-field>
            <mat-label i18n>Texto</mat-label>
            <input matInput [(ngModel)]="settings?.text[selected].body" (ngModelChange)="onChange()">
          </mat-form-field>
        </label>

        <label class="block">
          <mat-form-field appearance="fill">
            <mat-label i18n>Fuente</mat-label>
            <mat-select [(ngModel)]="settings?.text[selected].fontFamily" (ngModelChange)="onChange()" [disabled]="!settings?.text[selected].body">
              <mat-option *ngFor="let family of textSvc.fontFamilies" [value]="family.name" [style.font-family]="family | fn:loadFontFamily:this">
                {{ family.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </label>


      </div>

      <div class="flex">
        <label class="block">
          <ng-container i18n>Tamaño</ng-container>
          <mat-slider [(ngModel)]="settings?.text[selected].size" (input)="settings?.text[selected].size = $event.value; onChange()"
                      [disabled]="!settings?.text[selected].body" [min]="1" [max]="10" [thumbLabel]="true"></mat-slider>
        </label>

        <label class="block">
          <mat-form-field appearance="fill">
            <mat-label i18n>Forma</mat-label>
            <mat-select [(ngModel)]="settings?.text[selected].path" (ngModelChange)="onChange()" [disabled]="!settings?.text[selected].body">
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
          <color-picker [(ngModel)]="settings?.text[selected].color" (ngModelChange)="onChange()" [disabled]="!settings?.text[selected].body"></color-picker>
        </label>
      </div>

      <div class="flex">
        <label>
          <ng-container i18n>Posición horizontal</ng-container>
          <mat-slider [(ngModel)]="settings?.text[selected].x" (input)="settings?.text[selected].x = $event.value; onChange()"
                      [disabled]="!settings?.text[selected].body" [min]="0" [max]="100" [thumbLabel]="true"></mat-slider>
        </label>
        <label>
          <ng-container i18n>Posición vertical</ng-container>
          <mat-slider [(ngModel)]="settings?.text[selected].y" (input)="settings?.text[selected].y = $event.value; onChange()"
                      [disabled]="!settings?.text[selected].body" [min]="0" [max]="100" [thumbLabel]="true"></mat-slider>
        </label>
      </div>

      <div>
        <label>
          <ng-container i18n>Espaciado de letras</ng-container>
          <mat-slider [(ngModel)]="settings?.text[selected].spacing" (input)="settings?.text[selected].spacing = $event.value; onChange()"
                      [disabled]="!settings?.text[selected].body" [min]="-25" [max]="50" [thumbLabel]="true"></mat-slider>
        </label>
      </div>

      <hr/>

      <div>
        <label>
          <ng-container i18n>Borde</ng-container>
          <color-picker [(ngModel)]="settings?.text[selected].borderColor" (ngModelChange)="onChange()"
                        [allowNullSelection]="true" [disabled]="!settings?.text[selected].body"></color-picker>
        </label>

        <label *ngIf="settings?.text[selected].borderColor">
          <ng-container i18n>Tamaño</ng-container>
          <mat-slider [(ngModel)]="settings?.text[selected].borderSize" (input)="settings?.text[selected].borderSize = $event.value; onChange()"
                      [min]="1" [max]="8" [thumbLabel]="true" [disabled]="!settings?.text[selected].body"></mat-slider>
        </label>
      </div>

      <div style="text-align: center; margin:5px 0">
        <button mat-raised-button (click)="addText()">
          <svg style="width: 1.3em; height: 1.3em;" viewBox="0 0 512 512">
            <path
              d="m432 203l-123 0l0-123c0-5-5-10-10-10l-86 0c-5 0-10 5-10 10l0 123l-123 0c-5 0-10 5-10 10l0 86c0 3 1 5 3 7c2 2 4 3 7 3l123 0l0 123c0 3 1 5 3 7c2 2 4 3 7 3l86 0c3 0 5-1 7-3c2-2 3-4 3-7l0-123l123 0c3 0 5-1 7-3c2-2 3-4 3-7l0-86c0-5-5-10-10-10z"></path>
          </svg>
          <ng-container i18n>Añadir</ng-container>
        </button>
      </div>
  `,
  styles: [
    `div {
      margin: 10px 0;
    }

    label {
      margin: 0 5px;
    }

    .select-label {
      margin-top: 10px;
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

  selected = 0;

  constructor(public textSvc: NgShieldTextService,
              @Inject(DOCUMENT) private _document: Document) {

  }

  public onChange() {
    this.settings = {...this.settings}; // Realizar copia superficial del objeto para que el detector de cambios pueda detectar el cambio
    this._onChangeCallback(this.settings);
  }

  public addText() {
    const newText = {...this.textSvc.defaultSettings};
    newText.y = Math.min(90, newText.y + this.settings.text.length * 10);
    this.settings.text.push(newText);
    this.onChange();
  }

  public isSameFont(fontA, fontB): boolean {
    return fontA && fontB && fontA.name == fontB.name;
  }

  public originalOrder() {
    return 0;
  }

  public loadFontFamily(font: { name: string, url?: string }): string {
    if (font.url) {
      const style = this._document.createElement('style');
      style.appendChild(document.createTextNode(`@font-face {
    font-family: ${font.name};
    src: url(${font.url}) format('truetype');
}`));
      this._document.head.appendChild(style);
    }

    return font.name;
  }

  /* ControlValueAccessor */
  public registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
  }

  public writeValue(settings: NgShieldSettings): void {
    if (settings) {
      if (!Array.isArray(settings.text)) { // Compatibilidad con versiones sin soporte para múltiples textos
        settings.text = [settings.text || this.textSvc.defaultSettings];
      }
      if (settings.text) {
        settings.text.forEach(t => {
          if (!t.fontFamily || typeof t.fontFamily != 'string') {
            t.fontFamily = this.textSvc.fontFamilies[0].name;
          }
        });
      }
    }

    this.settings = settings;
  }
}
