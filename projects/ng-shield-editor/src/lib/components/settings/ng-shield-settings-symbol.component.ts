import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgShieldSettings} from '../../ng-shield-settings';
import {noop} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {NgShieldSymbolService} from '../../services/ng-shield-symbol.service';

@Component({
  selector: 'ng-shield-editor-settings-symbol',
  template: `
    <div class="default-symbols">
      <div
        class="symbol-thumb"
        [class.active]="settings?.symbol.content === null"
        (click)="onSymbolSelected(null)">
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m411 255c0-31-8-59-24-84l-216 215c26 17 55 25 85 25 21 0 41-4 60-12 20-8 36-19 50-33 14-14 25-31 33-50 8-19 12-40 12-61z m-285 86l216-216c-26-17-55-26-86-26-28 0-54 7-78 21-24 14-43 33-57 57-13 24-20 50-20 78 0 31 8 59 25 86z m349-86c0 30-5 59-17 86-12 27-27 51-47 70-19 20-43 35-70 47-27 12-55 17-85 17-30 0-58-5-85-17-27-12-51-27-70-47-20-19-35-43-47-70-12-27-17-56-17-86 0-30 5-58 17-85 12-28 27-51 47-71 19-19 43-35 70-46 27-12 55-18 85-18 30 0 58 6 85 18 27 11 51 27 70 46 20 20 35 43 47 71 12 27 17 55 17 85z"></path>
        </svg>
      </div>

      <div class="symbol-thumb">
        <label style="display: block; cursor: pointer;">
          <svg viewBox="0 0 512 512">
            <path
              d="m165 210l0 55c0 8-3 14-8 20-6 5-12 8-20 8l-55 0c-7 0-14-3-19-8-5-6-8-12-8-20l0-55c0-7 3-14 8-19 5-5 12-8 19-8l55 0c8 0 14 3 20 8 5 5 8 12 8 19z m146 0l0 55c0 8-3 14-8 20-5 5-12 8-20 8l-54 0c-8 0-15-3-20-8-5-6-8-12-8-20l0-55c0-7 3-14 8-19 5-5 12-8 20-8l54 0c8 0 15 3 20 8 5 5 8 12 8 19z m146 0l0 55c0 8-3 14-8 20-5 5-12 8-19 8l-55 0c-8 0-14-3-20-8-5-6-8-12-8-20l0-55c0-7 3-14 8-19 6-5 12-8 20-8l55 0c7 0 14 3 19 8 5 5 8 12 8 19z"></path>
          </svg>
          <input type="file" accept="image/*" (change)="fileChanged($event)" style="display:none"/>
        </label>
      </div>

      <div *ngFor="let symbol of symbolSvc.available"
           class="symbol-thumb"
           [class.active]="symbol == settings?.symbol.content"
           (click)="onSymbolSelected(symbol)">
        <img [src]="symbol | fn:sanitizer.bypassSecurityTrustUrl"/>
      </div>
    </div>

    <ng-container *ngIf="settings">
      <div class="flex">
        <label>
          <ng-container i18n>Posición X</ng-container>
          <mat-slider [(ngModel)]="settings.symbol.x" (ngModelChange)="onChange()"
                      [disabled]="settings.symbol.content === null" [min]="0" [max]="100" [thumbLabel]="true"></mat-slider>
        </label>
        <label>
          <ng-container i18n>Posición Y</ng-container>
          <mat-slider [(ngModel)]="settings.symbol.y" (ngModelChange)="onChange()"
                      [disabled]="settings.symbol.content === null" [min]="0" [max]="100" [thumbLabel]="true"></mat-slider>
        </label>
      </div>

      <div>
        <label>
          <ng-container i18n>Tamaño</ng-container>
          <mat-slider [(ngModel)]="settings.symbol.size" (ngModelChange)="onChange()"
                      [disabled]="settings.symbol.content === null" [min]="1" [max]="200" [thumbLabel]="true"></mat-slider>
        </label>
      </div>

      <div>
        <label>
          <input type="checkbox" [(ngModel)]="settings.symbol.trim" (ngModelChange)="onChange()" [disabled]="settings.symbol.content === null"/>
          <ng-container i18n>Recortar</ng-container>
        </label>
      </div>

    </ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .default-symbols {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 10px 0;
      }

      .symbol-thumb {
        width: 64px;
        height: 64px;
        margin: 0 10px 10px 0;
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
  public settings: NgShieldSettings;
  private _onChangeCallback: (v: any) => void = noop;
  @Input() public allowNullSelection = false;

  constructor(public symbolSvc: NgShieldSymbolService,
              public sanitizer: DomSanitizer) {
  }

  public onSymbolSelected(symbol: string) {
    this.settings.symbol.content = symbol;
    this.onChange();
  }

  public onChange() {
    this.settings = {...this.settings};
    this._onChangeCallback(this.settings);
  }


  public fileChanged(event: Event) {
    new Promise((resolve, reject) => {
      const fileField = event.currentTarget as HTMLInputElement;
      const file = fileField.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
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
      this.settings.symbol.content = image;
      this.onChange();
    }).catch((err) => {
      console.log(err);
    });
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
