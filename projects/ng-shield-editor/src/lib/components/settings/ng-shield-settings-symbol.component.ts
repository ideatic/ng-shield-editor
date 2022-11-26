import {ChangeDetectionStrategy, Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgShieldSettings, NgShieldSettingsSymbol} from '../../ng-shield-settings';
import {noop} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {NgShieldSymbolService} from '../../services/ng-shield-symbol.service';
import {ImageToolService} from '../../services/image-tool.service';
import {imports} from "../imports";
import {ColorPickerComponent} from "../ui/color-picker.component";


@Component({
  selector: 'ng-shield-editor-settings-symbol',
  standalone: true,
  imports: [imports, ColorPickerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mat-align">
      <div style="margin: 5px 0">
        <button mat-stroked-button class="addBtn" (click)="addSymbol()">
          <svg style="width: 1.3em; height: 1.3em;" viewBox="0 0 512 512">
            <path
              d="m432 203l-123 0l0-123c0-5-5-10-10-10l-86 0c-5 0-10 5-10 10l0 123l-123 0c-5 0-10 5-10 10l0 86c0 3 1 5 3 7c2 2 4 3 7 3l123 0l0 123c0 3 1 5 3 7c2 2 4 3 7 3l86 0c3 0 5-1 7-3c2-2 3-4 3-7l0-123l123 0c3 0 5-1 7-3c2-2 3-4 3-7l0-86c0-5-5-10-10-10z"></path>
          </svg>
        </button>
        <button *ngIf="settings?.symbol.length > 1" mat-stroked-button color="warn" class="trash-icon" (click)="deleteSymbol(selectedSymbol)">
          <svg width="1.3em" height="1.3em" viewBox="0 0 512 512">
            <path
              d="m464 32l-120 0-9-19c-4-8-13-13-22-13l-114 0c-9 0-18 5-22 13l-9 19-120 0c-9 0-16 7-16 16l0 32c0 9 7 16 16 16l416 0c9 0 16-7 16-16l0-32c0-9-7-16-16-16z m-379 435c2 25 23 45 48 45l246 0c25 0 46-20 48-45l21-339-384 0z"></path>
          </svg>
        </button>
      </div>

      <mat-form-field *ngIf="settings?.symbol.length > 1" appearance="fill" class="no-label-select">
        <mat-select [(ngModel)]="selectedSymbol" (ngModelChange)="onChange()">
          <mat-option *ngFor="let symbol of (settings?.symbol || []); index as index" [value]="symbol">
            <ng-container i18n>Símbolo</ng-container>
            #{{ index + 1 | number }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <div class="symbol-list">
      <div *ngIf="allowNullSelection"
           class="symbol-thumb"
           [class.active]="selectedSymbol.content === null"
           (click)="onSymbolSelected(selectedSymbol, null)">
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
          <input type="file" accept="image/*" (change)="fileChanged(selectedSymbol, $event)" style="display:none"/>
        </label>
      </div>

      <div *ngFor="let availableSymbol of symbolSvc.available"
           class="symbol-thumb"
           [class.active]="availableSymbol === selectedSymbol.content"
           (click)="onSymbolSelected(selectedSymbol, availableSymbol)">
        <img [src]="selectedSymbol | fn:getPreview:this:availableSymbol"/>
      </div>
    </div>

    <div class="flex">
      <label>
        <ng-container i18n>Posición horizontal</ng-container>
        <mat-slider [disabled]="selectedSymbol.content === null" [min]="0" [max]="100" discrete>
          <input matSliderThumb [(ngModel)]="selectedSymbol.x" (ngModelChange)="onChange()"/>
        </mat-slider>
      </label>
      <label>
        <ng-container i18n>Posición vertical</ng-container>
        <mat-slider [disabled]="selectedSymbol.content === null" [min]="0" [max]="100" discrete>
          <input matSliderThumb [(ngModel)]="selectedSymbol.y" (ngModelChange)="onChange()"/>
        </mat-slider>
      </label>
    </div>

    <div class="flex">
      <label>
        <ng-container i18n>Tamaño</ng-container>
        <mat-slider [disabled]="selectedSymbol.content === null" [min]="1" [max]="200" discrete>
          <input matSliderThumb [(ngModel)]="selectedSymbol.size" (ngModelChange)="onChange()"/>
        </mat-slider>
      </label>
      <label>
        <ng-container i18n>Rotación</ng-container>
        <mat-slider [disabled]="selectedSymbol.content === null" [min]="-180" [max]="180" [step]="5" discrete>
          <input matSliderThumb [(ngModel)]="selectedSymbol.rotation" (ngModelChange)="onChange()"/>
        </mat-slider>
      </label>
    </div>

    <div>
      <mat-slide-toggle [(ngModel)]="selectedSymbol.trim" (ngModelChange)="onChange()"
                        [disabled]="selectedSymbol.content === null" i18n>Recortar
      </mat-slide-toggle>
    </div>

    <div *ngIf="symbolSvc.isConfigurable(selectedSymbol)" style="margin-top: 10px">
      <label>
        <ng-container i18n>Color</ng-container>
        <color-picker [(ngModel)]="selectedSymbol.color" (ngModelChange)="onChange()"></color-picker>
      </label>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      /* Ajustar selects material que no usan label */
      .no-label-select ::ng-deep .mat-form-field-flex {
        padding: 0 .75em 0 .75em;
      }

      .no-label-select ::ng-deep .mat-select-arrow-wrapper {
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
        margin: 10px 0;
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

  protected settings: NgShieldSettings;
  private _onChangeCallback: (v: any) => void = noop;

  protected selectedSymbol: NgShieldSettingsSymbol = this.symbolSvc.defaultSettings;

  constructor(protected symbolSvc: NgShieldSymbolService,
              private _imageSvc: ImageToolService,
              private _sanitizer: DomSanitizer) {
  }

  protected onSymbolSelected(symbol: NgShieldSettingsSymbol, content: string) {
    symbol.content = content;
    this.onChange();
  }

  protected onChange() {
    this.settings = {...this.settings};
    this._onChangeCallback(this.settings);
  }


  protected fileChanged(symbol: NgShieldSettingsSymbol, event: Event) {
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

  protected getPreview(symbol: NgShieldSettingsSymbol, content: string) {
    return this._sanitizer.bypassSecurityTrustUrl(this.symbolSvc.render({...symbol, content: content}));
  }

  protected addSymbol() {
    const newSymbol = {...this.symbolSvc.defaultSettings};
    newSymbol.y = Math.min(90, newSymbol.y + this.settings.text.length * 10);
    this.settings.symbol.push(newSymbol);
    this.selectedSymbol = newSymbol;
    this.onChange();
  }

  protected deleteSymbol(symbol: NgShieldSettingsSymbol) {
    let index = this.settings.symbol.indexOf(symbol);
    if (index > -1 && symbol === this.selectedSymbol) {
      this.settings.symbol.splice(index, 1);
      this.selectedSymbol = this.settings.symbol[Math.max(index - 1, 0)];
    }

    this.onChange();
  }

  /* ControlValueAccessor */
  public registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
  }

  public writeValue(settings: NgShieldSettings): void {
    if (settings) {
      if (!Array.isArray(settings.symbol)) { // Compatibilidad con versiones sin soporte para múltiples símbolos
        settings.symbol = [settings.symbol || this.symbolSvc.defaultSettings];
      }

      this.selectedSymbol = settings.symbol.find(s => s === this.selectedSymbol) || settings.symbol[0];
    }

    this.settings = settings;
  }
}
