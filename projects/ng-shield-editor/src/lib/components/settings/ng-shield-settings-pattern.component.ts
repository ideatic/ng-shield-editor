import {ChangeDetectionStrategy, Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgShieldSettings} from '../../ng-shield-settings';
import {noop} from 'rxjs';
import {NgShieldBuilderService} from '../../services/ng-shield-builder.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {NgShieldPatternService} from '../../services/ng-shield-pattern.service';
import {imports} from "../imports";
import {ColorPickerComponent} from "../ui/color-picker.component";

@Component({
  selector: 'ng-shield-editor-settings-pattern',
  standalone: true,
  imports: [imports, ColorPickerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="patterns">
        @for (pattern of patternSvc.available | keyvalue: originalOrder; track pattern) {
            <div
           class="pattern-thumb"
           [class.active]="pattern.key == settings?.motif.id"
           [innerHTML]="pattern.key | fn:getPatternThumbnail:this:settings"
           (click)="onPatternSelected(pattern.key)"></div>
        }
    </div>

    @if (settings) {        <label>
        <ng-container i18n>Color</ng-container>
        <color-picker [disabled]="settings.motif.id === 'none'" [(ngModel)]="settings.motif.color" (ngModelChange)="onChange()"/>
      </label>

      <div class="flex">
        <label>
          <ng-container i18n>Posición horizontal</ng-container>
          <mat-slider discrete [disabled]="settings.motif.id === 'none'" [min]="0" [max]="100">
            <input matSliderThumb [(ngModel)]="settings.motif.x" (ngModelChange)="onChange()"/>
          </mat-slider>
        </label>
        <label>
          <ng-container i18n>Posición vertical</ng-container>
          <mat-slider discrete [disabled]="settings.motif.id === 'none'" [min]="0" [max]="100">
            <input matSliderThumb [(ngModel)]="settings.motif.y" (ngModelChange)="onChange()"/>
          </mat-slider>
        </label>
      </div>

      <div>
        <label>
          <ng-container i18n>Zoom</ng-container>
          <mat-slider discrete [disabled]="settings.motif.id === 'none'" [min]="0" [max]="300" [step]="10">
            <input matSliderThumb [(ngModel)]="settings.motif.zoom" (ngModelChange)="onChange()"/>
          </mat-slider>
        </label>
      </div>

    }
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .patterns {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        margin: -10px; /* https://twitter.com/devongovett/status/1244679626162450432 */

        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(95px, 1fr));
      }

      .pattern-thumb {
        width: 75px;
        height: 75px;
        margin: 10px;
        padding: 5px;
        border-radius: 6px;
        background: #ebf0f6;
        outline: none;
        cursor: pointer;
        border: 2px solid transparent;
      }

      .pattern-thumb ::ng-deep svg {
        max-width: 100%;
        max-height: 100%;
      }

      .pattern-thumb.active {
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
      useExisting: forwardRef(() => NgShieldSettingsPatternComponent),
      multi: true
    }
  ]
})
export class NgShieldSettingsPatternComponent implements ControlValueAccessor {
  public settings: NgShieldSettings;
  private _onChangeCallback: (v: any) => void = noop;

  constructor(protected patternSvc: NgShieldPatternService,
              private _ngShieldSvc: NgShieldBuilderService,
              private _sanitizer: DomSanitizer) {
  }

  protected onPatternSelected(patternID: string): void {
    if (patternID != this.settings.motif.id) {
      this.settings = {...this.settings, motif: {...this.settings.motif, id: patternID}};
      this._onChangeCallback(this.settings);
    }
  }

  protected getPatternThumbnail(motifID: string): SafeHtml | null {
    if (this.settings) {
      return this._sanitizer.bypassSecurityTrustHtml(this._ngShieldSvc.generateSVG({...this.settings, motif: {...this.settings.motif, id: motifID}}));
    } else {
      return null;
    }
  }

  protected onChange(): void {
    this.settings = {...this.settings};
    this._onChangeCallback(this.settings);
  }

  protected originalOrder(): number {
    return 0;
  }

  /* ControlValueAccessor */
  public registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

    public registerOnTouched(): void {
    // No se utiliza
  }

  public writeValue(obj: any): void {
    this.settings = obj;
  }
}
