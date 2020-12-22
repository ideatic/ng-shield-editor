import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'color-picker',
  template: `
    <div
      *ngFor="let color of palette"
      class="swatch"
      [class.active]="color == selectedColor"
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
        margin: 0 -10px;
        padding: 10px 0 0 10px;
        border-top: 1px solid rgb(238, 238, 238);
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

      .swatch.active {
        border: 2px solid #3666c8;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true,
    },
  ],
})
export class ColorPickerComponent implements ControlValueAccessor {
  public selectedColor: string;
  private _onChangeCallback: (v: string) => void = noop;

  public palette = [
    '#B80000',
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
    '#FFC107',
    '#FF9800',
    '#FF5722',
    '#795548',
    '#607D8B',
    '#969696',
    '#000000',
    '#F0F0F0',
  ];

  public onColorSelected(color) {
    this.selectedColor = color;
    this._onChangeCallback(color);
  }

  /* ControlValueAccessor */
  public registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {}

  public writeValue(obj: any): void {
    this.selectedColor = obj;
  }
}
