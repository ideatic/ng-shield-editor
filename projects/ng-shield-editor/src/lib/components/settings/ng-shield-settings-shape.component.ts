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
    <div *ngFor="let shape of shapeSvc.available; index as index"
         class="shape-thumb" [class.active]="index == settings?.shape"
         (click)="onShapeSelected(index)" [innerHTML]="index | fn:getShapeThumbnail:this"></div>
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
  public onChangeCallback: (v: any) => void = noop;

  constructor(public shapeSvc: NgShieldShapeService,
              private _ngShieldSvc:NgShieldEditorService,
              private _sanitizer: DomSanitizer) {
  }


  public onShapeSelected(shape: number) {
    this.settings = {...this.settings, shape: shape};
    this.onChangeCallback(this.settings);
  }

  public getShapeThumbnail(shape: number): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(this._ngShieldSvc.generateSVG({...this.settings, shape: shape}));
  }

  /* ControlValueAccessor */
  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
  }

  public writeValue(obj: any): void {
    this.settings = obj;
  }
}
