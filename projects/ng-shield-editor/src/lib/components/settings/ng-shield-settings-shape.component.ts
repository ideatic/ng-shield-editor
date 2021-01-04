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
    <div class="shapes">
      <div *ngFor="let shape of shapeSvc.available | keyvalue: objectOrdered"
           class="shape-thumb" [class.active]="shape.key == settings?.shape.id"
           (click)="onShapeSelected($any(shape.key))" [innerHTML]="shape.key | fn:getShapeThumbnail:this:settings"></div>
    </div>

    <ng-container *ngIf="settings">
      <label style="display: block">
        <input type="checkbox" [(ngModel)]="settings.shape.stroke" (ngModelChange)="onChange()"/>
        <ng-container i18n>Pintar borde</ng-container>
      </label>

      <label style="display: block">
        <input type="checkbox" [(ngModel)]="settings.gloss" (ngModelChange)="onChange()"/>
        <ng-container i18n>Gloss</ng-container>
      </label>

      <label>
        <ng-container i18n>Color</ng-container>
        <color-picker [(ngModel)]="settings.shape.color" (ngModelChange)="onChange()"></color-picker>
      </label>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .shapes {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 10px 0;
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


  public onShapeSelected(shapeID: string) {
    if (shapeID != this.settings.shape.id) {
      this.settings.shape.id = shapeID;
      this.settings = {...this.settings};
      this._onChangeCallback(this.settings);
    }
  }

  public getShapeThumbnail(shapeID: string): SafeHtml | null {
    if (this.settings) {
      return this._sanitizer.bypassSecurityTrustHtml(this._ngShieldSvc.generateSVG({...this.settings, shape: {...this.settings.shape, id: shapeID}}));
    } else {
      return null;
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

  public objectOrdered () {
    return 0;
  }
}
