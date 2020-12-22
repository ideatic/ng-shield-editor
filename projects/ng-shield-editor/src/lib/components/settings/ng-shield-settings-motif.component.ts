import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgShieldSettings } from '../../ng-shield-settings';
import { noop } from 'rxjs';
import { NgShieldEditorService } from '../../services/ng-shield-editor.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgShieldMotifService } from '../../services/ng-shield-motif.service';

@Component({
  selector: 'ng-shield-editor-settings-motif',
  template: `
    <div
      *ngFor="let motif of motifSvc.available; index as index"
      class="motif-thumb"
      [class.active]="index == settings?.motif"
      (click)="onMotifSelected(index)"
      [innerHTML]="index | fn: getMotifThumbnail:this:settings"
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

      .motif-thumb {
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

      .motif-thumb ::ng-deep svg {
        max-width: 100%;
        max-height: 100%;
      }

      .motif-thumb.active {
        border: 2px solid #3666c8;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgShieldSettingsMotifComponent),
      multi: true,
    },
  ],
})
export class NgShieldSettingsMotifComponent implements ControlValueAccessor {
  public settings: NgShieldSettings;
  private _onChangeCallback: (v: any) => void = noop;

  constructor(
    public motifSvc: NgShieldMotifService,
    private _ngShieldSvc: NgShieldEditorService,
    private _sanitizer: DomSanitizer
  ) {}

  public onMotifSelected(motif: number) {
    if (motif != this.settings.motif) {
      this.settings = { ...this.settings, motif: motif };
      this._onChangeCallback(this.settings);
    }
  }

  public getMotifThumbnail(motif: number): SafeHtml {
    if (this.settings) {
      return this._sanitizer.bypassSecurityTrustHtml(
        this._ngShieldSvc.generateSVG({ ...this.settings, motif: motif })
      );
    }
  }

  public onBorderChanged() {
    this.settings = { ...this.settings };
    this._onChangeCallback(this.settings);
  }

  /* ControlValueAccessor */
  public registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {}

  public writeValue(obj: any): void {
    this.settings = obj;
  }
}