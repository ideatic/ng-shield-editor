import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgShieldSettings} from '../../ng-shield-settings';
import {noop} from 'rxjs';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {NgShieldSymbolService} from '../../services/ng-shield-symbol.service';

@Component({
  selector: 'ng-shield-editor-settings-symbol',
  template: `
    <div class="default-symbols">
      <div *ngFor="let symbol of symbolSvc.available"
           class="symbol-thumb"
           [class.active]="symbol == settings?.symbol.content"
           (click)="onSymbolSelected(symbol)">
        <img [src]="symbol"/>
      </div>
    </div>

    <div>
      <input type="file" accept="image/*" (change)="fileChanged($event)"/>
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

  public getSymbolThumbnail(symbol: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(this.symbolSvc.available[symbol]);
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
        reader.onload = () => resolve(reader.result);
        reader.onerror = err => reject(`Unable to load file: ${err}`);
        reader.readAsDataURL(file);
      } else {
        resolve(null);
      }
    }).then((image: string) => {
      this.settings.symbol.content = image;
      this.onChange();
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
