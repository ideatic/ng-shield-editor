import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgShieldSettings, NgShieldSettingsSymbol} from '../../ng-shield-settings';
import {noop} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {NgShieldSymbolService} from '../../services/ng-shield-symbol.service';
import {ImageToolService} from '../../services/image-tool.service';


@Component({
  selector: 'ng-shield-editor-settings-symbol',
  template: `
    <mat-form-field class="select-label" *ngIf="settings?.symbol.length > 1">
      <mat-label i18n>Selecciona un símbolo</mat-label>
      <mat-select [(value)]="selected" [(ngModel)]="settings?.symbol.content" (ngModelChange)="onChange()">
        <mat-option *ngFor="let symbol of (settings?.symbol || []); index as index" value="{{ index }}">
          <ng-container i18n>Símbolo</ng-container>
          #{{ index + 1 | number }}
        </mat-option>
      </mat-select>
    </mat-form-field>

    <div class="symbol-list">
      <div *ngIf="allowNullSelection"
          class="symbol-thumb"
          [class.active]="settings?.symbol.content === null"
          (click)="onSymbolSelected(settings.symbol[selected], null)">
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m411 255c0-31-8-59-24-84l-216 215c26 17 55 25 85 25 21 0 41-4 60-12 20-8 36-19 50-33 14-14 25-31 33-50 8-19 12-40 12-61z m-285 86l216-216c-26-17-55-26-86-26-28 0-54 7-78 21-24 14-43 33-57 57-13 24-20 50-20 78 0 31 8 59 25 86z m349-86c0 30-5 59-17 86-12 27-27 51-47 70-19 20-43 35-70 47-27 12-55 17-85 17-30 0-58-5-85-17-27-12-51-27-70-47-20-19-35-43-47-70-12-27-17-56-17-86 0-30 5-58 17-85 12-28 27-51 47-71 19-19 43-35 70-46 27-12 55-18 85-18 30 0 58 6 85 18 27 11 51 27 70 46 20 20 35 43 47 71 12 27 17 55 17 85z"></path>
        </svg>
      </div>

      <div *ngIf="symbolSvc.allowSymbolUpload" class="symbol-thumb">
        <label style="display: block; cursor: pointer;">
          <svg viewBox="0 0 512 512">
            <path
              d="m165 210l0 55c0 8-3 14-8 20-6 5-12 8-20 8l-55 0c-7 0-14-3-19-8-5-6-8-12-8-20l0-55c0-7 3-14 8-19 5-5 12-8 19-8l55 0c8 0 14 3 20 8 5 5 8 12 8 19z m146 0l0 55c0 8-3 14-8 20-5 5-12 8-20 8l-54 0c-8 0-15-3-20-8-5-6-8-12-8-20l0-55c0-7 3-14 8-19 5-5 12-8 20-8l54 0c8 0 15 3 20 8 5 5 8 12 8 19z m146 0l0 55c0 8-3 14-8 20-5 5-12 8-19 8l-55 0c-8 0-14-3-20-8-5-6-8-12-8-20l0-55c0-7 3-14 8-19 6-5 12-8 20-8l55 0c7 0 14 3 19 8 5 5 8 12 8 19z"></path>
          </svg>
          <input type="file" accept="image/*" (change)="fileChanged(settings.symbol, $event)" style="display:none"/>
        </label>
      </div>

      <div *ngFor="let availableSymbol of symbolSvc.available"
          class="symbol-thumb"
          [class.active]="availableSymbol === settings?.symbol.content"
          (click)="onSymbolSelected(settings.symbol[selected], availableSymbol)">
        <img [src]="settings?.symbol | fn:getPreview:this:availableSymbol"/>
      </div>
    </div>

    <div class="flex">
      <label>
        <ng-container i18n>Posición horizontal</ng-container>
        <mat-slider [(ngModel)]="settings?.symbol[selected].x" (input)="settings?.symbol[selected].x = $event.value; onChange()"
                    [disabled]="settings?.symbol[selected].content === null" [min]="0" [max]="100" [thumbLabel]="true"></mat-slider>
      </label>
      <label>
        <ng-container i18n>Posición vertical</ng-container>
        <mat-slider [(ngModel)]="settings?.symbol[selected].y" (input)="settings?.symbol[selected].y = $event.value; onChange()"
                    [disabled]="settings?.symbol[selected].content === null" [min]="0" [max]="100" [thumbLabel]="true"></mat-slider>
      </label>
    </div>

    <div class="flex">
      <label>
        <ng-container i18n>Tamaño</ng-container>
        <mat-slider [(ngModel)]="settings?.symbol[selected].size" (input)="settings?.symbol[selected].size = $event.value; onChange()"
                    [disabled]="settings?.symbol[selected].content === null" [min]="1" [max]="200" [thumbLabel]="true"></mat-slider>
      </label>
      <label>
        <ng-container i18n>Rotación</ng-container>
        <mat-slider [(ngModel)]="settings?.symbol[selected].rotation" (input)="settings?.symbol[selected].rotation = $event.value; onChange()"
                    [disabled]="settings?.symbol[selected].content === null" [min]="-180" [max]="180" [step]="5" [thumbLabel]="true"></mat-slider>
      </label>
    </div>

    <div>
      <mat-slide-toggle [(ngModel)]="settings?.symbol[selected].trim" (ngModelChange)="onChange()"
                        [disabled]="settings?.symbol[selected].content === null" i18n>Recortar
      </mat-slide-toggle>
    </div>

    <div *ngIf="symbolSvc.isConfigurable(settings?.symbol[selected])" style="margin-top: 10px">
      <label>
        <ng-container i18n>Color</ng-container>
        <color-picker [(ngModel)]="settings?.symbol[selected].color" (ngModelChange)="onChange()"></color-picker>
      </label>
    </div>

    <div style="text-align: center; margin:5px 0">
      <button mat-raised-button (click)="addSymbol()">
        <svg style="width: 1.3em; height: 1.3em;" viewBox="0 0 512 512">
          <path
            d="m432 203l-123 0l0-123c0-5-5-10-10-10l-86 0c-5 0-10 5-10 10l0 123l-123 0c-5 0-10 5-10 10l0 86c0 3 1 5 3 7c2 2 4 3 7 3l123 0l0 123c0 3 1 5 3 7c2 2 4 3 7 3l86 0c3 0 5-1 7-3c2-2 3-4 3-7l0-123l123 0c3 0 5-1 7-3c2-2 3-4 3-7l0-86c0-5-5-10-10-10z"></path>
        </svg>
        <ng-container i18n>Añadir</ng-container>
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .select-label {
        margin-top: 10px;
      }

      .symbol-list {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        margin: -10px;

        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(95px, 1fr));
      }

      .symbol-thumb {
        width: 75px;
        height: 75px;
        margin: 10px;
        padding: 5px;
        border-radius: 6px;
        background: #ebf0f6;
        outline: none;
        cursor: pointer;
        border: 2px solid transparent;
        text-align: center;
      }

      .symbol-thumb > img {
        max-width: 100%;
        max-height: 100%;
      }

      .symbol-thumb.active {
        border: 2px solid #3666c8;
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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgShieldSettingsSymbolComponent),
      multi: true
    }
  ]
})
export class NgShieldSettingsSymbolComponent implements ControlValueAccessor {
  @Input() public allowNullSelection = true;

  public settings: NgShieldSettings;
  private _onChangeCallback: (v: any) => void = noop;

  selected = 0;

  constructor(public symbolSvc: NgShieldSymbolService,
              private _imageSvc: ImageToolService,
              private _sanitizer: DomSanitizer) {
  }

  public onSymbolSelected(symbol: NgShieldSettingsSymbol, content: string) {
    console.log(symbol);
    console.log(this.settings.symbol);
    symbol.content = content;
    this.onChange();
  }

  public onChange() {
    this.settings = {...this.settings};
    this._onChangeCallback(this.settings);
  }


  public fileChanged(symbol: NgShieldSettingsSymbol, event: Event) {
    new Promise((resolve, reject) => {
      const fileField = event.currentTarget as HTMLInputElement;
      const file = fileField.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (this.symbolSvc.autoResizeImages) {
            this._imageSvc.resizeImage(reader.result as string, this.symbolSvc.autoResizeImages).then(resolve, reject);
          } else {
            resolve(reader.result);
          }
          if (fileField !== null) { // Reiniciar el campo
            fileField.value = '';
          }
        };

        reader.onerror = err => reject(`Unable to load file: ${err}`);
        reader.readAsDataURL(file);
      } else {
        resolve(null);
      }
    }).then((image: string) => {
      symbol.content = image;
      this.onChange();
    }).catch((err) => {
      console.log(err);
    });
  }

  public getPreview(symbol: NgShieldSettingsSymbol, content: string) {
    return this._sanitizer.bypassSecurityTrustUrl(this.symbolSvc.render({...symbol, content: content}));
  }

  public addSymbol() {
    const newSymbol = {...this.symbolSvc.defaultSettings};
    newSymbol.y = Math.min(90, newSymbol.y + this.settings.text.length * 10);
    this.settings.symbol.push(newSymbol);
    this.onChange();
  }

  /* ControlValueAccessor */
  public registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
  }

  public writeValue(settings: NgShieldSettings): void {
    if (settings && !Array.isArray(settings.symbol)) { // Compatibilidad con versiones sin soporte para múltiples símbolos
      settings.symbol = [settings.symbol || this.symbolSvc.defaultSettings];
    }

    this.settings = settings;
  }
}
