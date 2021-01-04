import {Component, forwardRef, HostBinding, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {noop} from 'rxjs';

@Component({
  selector: 'color-picker',
  template: `
    <div *ngIf="allowNullSelection"
         class="swatch"
         [class.active]="selectedColor === null && !isDisabled"
         (click)="onColorSelected(null)">
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m411 255c0-31-8-59-24-84l-216 215c26 17 55 25 85 25 21 0 41-4 60-12 20-8 36-19 50-33 14-14 25-31 33-50 8-19 12-40 12-61z m-285 86l216-216c-26-17-55-26-86-26-28 0-54 7-78 21-24 14-43 33-57 57-13 24-20 50-20 78 0 31 8 59 25 86z m349-86c0 30-5 59-17 86-12 27-27 51-47 70-19 20-43 35-70 47-27 12-55 17-85 17-30 0-58-5-85-17-27-12-51-27-70-47-20-19-35-43-47-70-12-27-17-56-17-86 0-30 5-58 17-85 12-28 27-51 47-71 19-19 43-35 70-46 27-12 55-18 85-18 30 0 58 6 85 18 27 11 51 27 70 46 20 20 35 43 47 71 12 27 17 55 17 85z"></path>
      </svg>
    </div>

    <div
      *ngFor="let color of colorPalette"
      class="swatch"
      [class.active]="(color | fn:isSameColor:this:selectedColor) && !isDisabled"
      [class.light]="(color | fn:brightnessByColor) > 200"
      [style.background]="color"
      (click)="onColorSelected(color)"
    ></div>
  `,
  styles: [
    `
      :host {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
      }

      .swatch {
        width: 32px;
        height: 32px;
        margin: 0 10px 10px 0;
        border-radius: 6px;
        outline: none;
        cursor: pointer;
        border: 2px solid transparent;
      }

      :host.disabled .swatch {
        cursor: not-allowed;
        opacity: .5;
      }

      .swatch.light {
        box-shadow: rgb(221, 221, 221) 0 0 0 1px inset;
      }

      .swatch.active {
        border: 2px solid #3666c8;
      }
    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true
    }
  ]
})
export class ColorPickerComponent implements ControlValueAccessor {
  @Input() public allowNullSelection = false;

  public selectedColor: string;

  @HostBinding('class.disabled')
  public isDisabled = false;

  private _onChangeCallback: (v: string) => void = noop;

  public readonly colorPalette = ColorPickerComponent.palette;


  public onColorSelected(color) {
    if (!this.isDisabled) {
      this.selectedColor = color;
      this._onChangeCallback(color);
    }
  }

  /**
   * Obtiene el valor de brillo: oscuro (0) ... claro (255)
   * @param color
   */
  public brightnessByColor(color: string): number | null {
    color = '' + color;

    let r, g, b;
    if (color.indexOf('#') == 0) { // Hex
      const hasFullSpec = color.length == 7;
      const m = color.substr(1).match(hasFullSpec ? /(\S{2})/g : /(\S{1})/g);
      if (m) {
        r = parseInt(m[0] + (hasFullSpec ? '' : m[0]), 16);
        g = parseInt(m[1] + (hasFullSpec ? '' : m[1]), 16);
        b = parseInt(m[2] + (hasFullSpec ? '' : m[2]), 16);
      }
    } else if (color.indexOf('rgb') == 0) { // RGB
      const m = color.match(/(\d+){3}/g);
      if (m) {
        [r, g, b] = m;
      }
    }
    if (typeof r != 'undefined') {
      return ((r * 299) + (g * 587) + (b * 114)) / 1000;
    } else {
      return null;
    }
  }

  public isSameColor(color1: string, color2: string): boolean {
    return color1 && color2 && color1.toUpperCase() == color2.toUpperCase();
  }

  /* ControlValueAccessor */
  public registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
  }

  public writeValue(obj: any): void {
    this.selectedColor = obj;
  }

  public setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  public static palette = [
    '#C90800',
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#008B02',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#E5CB14',
    '#FFC107',
    '#FF9800',
    '#FF5722',
    '#795548',
    '#607D8B',
    '#969696',
    '#231F20',
    '#000000',
    '#F0F0F0',
    '#FFFFFF'
  ];
}
