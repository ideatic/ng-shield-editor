import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgShieldSettings} from '../../ng-shield-settings';
import {noop} from 'rxjs';
import {NgShieldEditorService} from '../../services/ng-shield-editor.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {NgShieldMotifService} from '../../services/ng-shield-motif.service';

@Component({
  selector: 'ng-shield-editor-settings-motif',
  template: `
    <div class="motifs">
      <div
        *ngFor="let motif of motifSvc.available | keyvalue: originalOrder"
        class="motif-thumb"
        [class.active]="motif.key == settings?.motif.id"
        (click)="onMotifSelected(motif.key)"
        [innerHTML]="motif.key | fn:getMotifThumbnail:this:settings"
      ></div>
    </div>

    <ng-container *ngIf="settings">
      <label>
        <ng-container i18n>Color</ng-container>
        <color-picker [(ngModel)]="settings.motif.color" (ngModelChange)="onChange()"></color-picker>
      </label>

      <div class="flex">
        <label>
          <ng-container i18n>Posición horizontal</ng-container>
          <mat-slider [(ngModel)]="settings.motif.x" (ngModelChange)="onChange()" [min]="0" [max]="100" [thumbLabel]="true"></mat-slider>
        </label>
        <label>
          <ng-container i18n>Posición vertical</ng-container>
          <mat-slider [(ngModel)]="settings.motif.y" (ngModelChange)="onChange()" [min]="0" [max]="100" [thumbLabel]="true"></mat-slider>
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

      .motifs {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        gap: 10px;
      }

      .motif-thumb {
        width: 64px;
        height: 64px;
        margin: 0 1px 1px 0; /* for non-gap capability browsers */
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
      useExisting: forwardRef(() => NgShieldSettingsMotifComponent),
      multi: true
    }
  ]
})
export class NgShieldSettingsMotifComponent implements ControlValueAccessor {
  public settings: NgShieldSettings;
  private _onChangeCallback: (v: any) => void = noop;

  constructor(
    public motifSvc: NgShieldMotifService,
    private _ngShieldSvc: NgShieldEditorService,
    private _sanitizer: DomSanitizer
  ) {
  }

  public onMotifSelected(motifID: string) {
    if (motifID != this.settings.motif.id) {
      this.settings = {...this.settings, motif: {...this.settings.motif, id: motifID}};
      this._onChangeCallback(this.settings);
    }
  }

  public getMotifThumbnail(motifID: string): SafeHtml {
    if (this.settings) {
      return this._sanitizer.bypassSecurityTrustHtml(this._ngShieldSvc.generateSVG({...this.settings, motif: {...this.settings.motif, id: motifID}}));
    } else {
      return null;
    }
  }

  public onChange() {
    this.settings = {...this.settings};
    this._onChangeCallback(this.settings);
  }

  public originalOrder() {
    return 0;
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
