import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgShieldSettings} from '../../ng-shield-settings';
import {noop} from 'rxjs';
import {NgShieldEditorService} from '../../services/ng-shield-editor.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {NgShieldShapeService} from '../../services/ng-shield-shape.service';

@Component({
  selector: 'ng-shield-editor-settings-shape',
  template: `
    <div *ngFor="let shape of shapeSvc.available | keyvalue"
         class="shape-thumb" [class.active]="shape.key == settings?.shape"
         (click)="onShapeSelected(shape.key)" [innerHTML]="shape.key | fn:getShapeThumbnail:this:settings"></div>

    <ng-container *ngIf="settings">
      <label style="display: block">
        <input type="checkbox" [(ngModel)]="settings.stroke" (ngModelChange)="onChange()"/>
        <ng-container i18n>Pintar borde</ng-container>
      </label>

      <label>
        <ng-container i18n>Color</ng-container>
        <color-picker [(ngModel)]="settings.color1" (ngModelChange)="onChange()"></color-picker>
      </label>
    </ng-container>
  `,
  styles: [
    `
      :host {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0 0 10px;
        border-top: 1px solid rgb(238, 238, 238);
      }

      .shape-thumb {
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

      .shape-thumb ::ng-deep svg {
        max-width: 100%;
        max-height: 100%;
      }

      .shape-thumb.active {
        border: 2px solid #3666c8;
      }
    `
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgShieldSettingsShapeComponent),
    multi: true
  }]
})
export class NgShieldSettingsShapeComponent implements ControlValueAccessor {
  public settings: NgShieldSettings;
  private _onChangeCallback: (v: any) => void = noop;

  constructor(public shapeSvc: NgShieldShapeService,
              private _ngShieldSvc: NgShieldEditorService,
              private _sanitizer: DomSanitizer) {
  }


  public onShapeSelected(shape: string) {
    if (shape != this.settings.shape) {
      this.settings = {...this.settings, shape: shape};
      this._onChangeCallback(this.settings);
    }
  }

  public getShapeThumbnail(shape: string): SafeHtml {
    if (this.settings) {
      return this._sanitizer.bypassSecurityTrustHtml(this._ngShieldSvc.generateSVG({...this.settings, shape: shape}));
    }
  }

  public onChange() {
    this.settings = {...this.settings};
    this._onChangeCallback(this.settings);
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
