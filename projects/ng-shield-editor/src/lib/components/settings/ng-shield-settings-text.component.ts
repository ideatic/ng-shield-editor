import {Component, forwardRef, Inject} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgShieldSettings, NgShieldSettingsText} from '../../ng-shield-settings';
import {noop} from 'rxjs';
import {NgShieldTextService} from '../../services/ng-shield-text.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'ng-shield-editor-settings-text',
  template: `
    <div class="mat-align">
      <div style="margin:5px 0">
        <button mat-stroked-button class="addBtn" (click)="addText()">
          <svg style="width: 1.3em; height: 1.3em;" viewBox="0 0 512 512">
            <path
              d="m432 203l-123 0l0-123c0-5-5-10-10-10l-86 0c-5 0-10 5-10 10l0 123l-123 0c-5 0-10 5-10 10l0 86c0 3 1 5 3 7c2 2 4 3 7 3l123 0l0 123c0 3 1 5 3 7c2 2 4 3 7 3l86 0c3 0 5-1 7-3c2-2 3-4 3-7l0-123l123 0c3 0 5-1 7-3c2-2 3-4 3-7l0-86c0-5-5-10-10-10z"></path>
          </svg>
        </button>
        <button *ngIf="settings?.text.length > 1" mat-stroked-button color="warn" class="trash-icon" (click)="deleteText(selectedText)">
          <svg width="1.3em" height="1.3em" viewBox="0 0 512 512">
            <path
              d="m464 32l-120 0-9-19c-4-8-13-13-22-13l-114 0c-9 0-18 5-22 13l-9 19-120 0c-9 0-16 7-16 16l0 32c0 9 7 16 16 16l416 0c9 0 16-7 16-16l0-32c0-9-7-16-16-16z m-379 435c2 25 23 45 48 45l246 0c25 0 46-20 48-45l21-339-384 0z"></path>
          </svg>
        </button>
      </div>

      <mat-form-field *ngIf="settings?.text.length > 1" appearance="fill" class="no-label-select" floatLabel="never">
        <mat-select [(ngModel)]="selectedText" (ngModelChange)="onChange()">
          <mat-option *ngFor="let text of (settings?.text || []); index as index" [value]="text">
            <ng-container *ngIf="text.body; else noTextBody">{{ text.body }}</ng-container>
            <ng-template #noTextBody>
              <ng-container i18n>Texto</ng-container>
              #{{ index + 1 | number }}
            </ng-template>
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <div class="flex">
      <label class="block">
        <mat-form-field>
          <mat-label i18n>Texto</mat-label>
          <input matInput [(ngModel)]="selectedText.body" (ngModelChange)="onChange()">
        </mat-form-field>
      </label>

      <label class="block">
        <mat-form-field>
          <mat-label i18n>Fuente</mat-label>
          <mat-select [(ngModel)]="selectedText.fontFamily" (ngModelChange)="onChange()" [disabled]="!selectedText.body">
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
        <mat-slider [(ngModel)]="selectedText.size" (input)="selectedText.size = $event.value; onChange()"
                    [disabled]="!selectedText.body" [min]="1" [max]="10" [thumbLabel]="true"></mat-slider>
      </label>

      <label class="block">
        <mat-form-field>
          <mat-label i18n>Forma</mat-label>
          <mat-select [(ngModel)]="selectedText.path" (ngModelChange)="onChange()" [disabled]="!selectedText.body">
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
        <color-picker [(ngModel)]="selectedText.color" (ngModelChange)="onChange()" [disabled]="!selectedText.body"></color-picker>
      </label>
    </div>

    <div class="flex">
      <label>
        <ng-container i18n>Posición horizontal</ng-container>
        <mat-slider [(ngModel)]="selectedText.x" (input)="selectedText.x = $event.value; onChange()"
                    [disabled]="!selectedText.body" [min]="0" [max]="100" [thumbLabel]="true"></mat-slider>
      </label>
      <label>
        <ng-container i18n>Posición vertical</ng-container>
        <mat-slider [(ngModel)]="selectedText.y" (input)="selectedText.y = $event.value; onChange()"
                    [disabled]="!selectedText.body" [min]="0" [max]="100" [thumbLabel]="true"></mat-slider>
      </label>
    </div>

    <div>
      <label>
        <ng-container i18n>Espaciado de letras</ng-container>
        <mat-slider [(ngModel)]="selectedText.spacing" (input)="selectedText.spacing = $event.value; onChange()"
                    [disabled]="!selectedText.body" [min]="-25" [max]="50" [thumbLabel]="true"></mat-slider>
      </label>
    </div>

    <hr/>

    <div>
      <label>
        <ng-container i18n>Borde</ng-container>
        <color-picker [(ngModel)]="selectedText.borderColor" (ngModelChange)="onChange()"
                      [allowNullSelection]="true" [disabled]="!selectedText.body"></color-picker>
      </label>

      <label *ngIf="selectedText.borderColor">
        <ng-container i18n>Tamaño</ng-container>
        <mat-slider [(ngModel)]="selectedText.borderSize" (input)="selectedText.borderSize = $event.value; onChange()"
                    [min]="1" [max]="8" [thumbLabel]="true" [disabled]="!selectedText.body"></mat-slider>
      </label>
    </div>
  `,
  styles: [
    `div {
      margin: 10px 0;
    }

    label {
      margin: 0 5px;
    }


    /* Ajustar selects material que no usan label */
    .no-label-select ::ng-deep .mat-form-field-flex {
      padding: 0 .75em 0 .75em;
    }

    .no-label-select ::ng-deep .mat-select-arrow-wrapper{
      transform: none;
    }

    .trash-icon:hover {
      border-color: #f44336;
      transition: 0.3s;
    }

    .trash-icon svg {
      fill: #f44336;
    }

    .addBtn {
      margin: 5px;
    }

    .mat-align {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row-reverse;
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

  public selectedText: NgShieldSettingsText = this.textSvc.defaultSettings;

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
    this.selectedText = newText;
    this.onChange();
  }

  public deleteText(text: NgShieldSettingsText) {
    let index = this.settings.text.indexOf(text);
    if (index > -1 && text == this.selectedText) {
      this.settings.text.splice(index, 1);
      this.selectedText = this.settings.text[Math.max(index - 1, 0)];
    }

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

      this.selectedText = settings.text.find(t => t === this.selectedText) || settings.text[0];
    }

    this.settings = settings;
  }
}
