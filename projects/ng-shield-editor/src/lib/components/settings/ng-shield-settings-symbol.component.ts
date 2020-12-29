import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgShieldSettings} from '../../ng-shield-settings';
import {noop} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {NgShieldSymbolService} from '../../services/ng-shield-symbol.service';

@Component({
  selector: 'ng-shield-editor-settings-symbol',
  template: `
    <div class="default-symbols">
      <div class="symbol-thumb" [class.active]="settings?.symbol.content | fn:isDataURL">
        <label style="display: block; cursor: pointer;">
          <svg viewBox="0 0 512 512"><path d="m165 210l0 55c0 8-3 14-8 20-6 5-12 8-20 8l-55 0c-7 0-14-3-19-8-5-6-8-12-8-20l0-55c0-7 3-14 8-19 5-5 12-8 19-8l55 0c8 0 14 3 20 8 5 5 8 12 8 19z m146 0l0 55c0 8-3 14-8 20-5 5-12 8-20 8l-54 0c-8 0-15-3-20-8-5-6-8-12-8-20l0-55c0-7 3-14 8-19 5-5 12-8 20-8l54 0c8 0 15 3 20 8 5 5 8 12 8 19z m146 0l0 55c0 8-3 14-8 20-5 5-12 8-19 8l-55 0c-8 0-14-3-20-8-5-6-8-12-8-20l0-55c0-7 3-14 8-19 6-5 12-8 20-8l55 0c7 0 14 3 19 8 5 5 8 12 8 19z" ></path></svg>
          <input type="file" accept="image/*" (change)="fileChanged($event)" style="display:none;"/>
        </label>
      </div>

      <div *ngFor="let symbol of symbolSvc.available"
           class="symbol-thumb"
           [class.active]="symbol == settings?.symbol.content"
           (click)="onSymbolSelected(symbol)">
        <img [src]="symbol"/>
      </div>
    </div>

    <ng-container *ngIf="settings">
      <div class="flex">
        <label>
          <ng-container i18n>Posición X</ng-container>
          <mat-slider [(ngModel)]="settings.symbol.x" (ngModelChange)="onChange()" [min]="0" [max]="100" [thumbLabel]="true"></mat-slider>
        </label>
        <label>
          <ng-container i18n>Posición Y</ng-container>
          <mat-slider [(ngModel)]="settings.symbol.y" (ngModelChange)="onChange()" [min]="0" [max]="100" [thumbLabel]="true"></mat-slider>
        </label>
      </div>

      <div>
        <label>
          <ng-container i18n>Tamaño</ng-container>
          <mat-slider [(ngModel)]="settings.symbol.size" (ngModelChange)="onChange()" [min]="1" [max]="200" [thumbLabel]="true"></mat-slider>
        </label>
      </div>

      <div>
        <label>
          <input type="checkbox" [(ngModel)]="settings.symbol.trim" (ngModelChange)="onChange()"/>
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

  constructor(public symbolSvc: NgShieldSymbolService,
              private _sanitizer: DomSanitizer) {
  }

  public onSymbolSelected(symbol: string) {
    this.settings.symbol.content = symbol;
    this.onChange();
  }

  public isDataURL(symbol: string): boolean {
    return symbol && symbol.indexOf('data:') === 0;
  }

  public onChange() {
    this.settings = {...this.settings};
    this._onChangeCallback(this.settings);
  }


  public fileChanged(event: Event) {
    new Promise((resolve, reject) => {
      const file = (event.currentTarget as HTMLInputElement).files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
          if((event.currentTarget as HTMLInputElement) !== null){
            (event.currentTarget as HTMLInputElement).value = '';
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
