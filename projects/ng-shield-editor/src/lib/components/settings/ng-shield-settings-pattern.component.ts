import { Component, inject, model } from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import type { SafeHtml } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import type { NgShieldSettings } from '../../ng-shield-settings';
import { NgShieldBuilderService } from '../../services/ng-shield-builder.service';
import { NgShieldPatternService } from '../../services/ng-shield-pattern.service';
import { imports } from '../imports';
import { ColorPickerComponent } from '../ui/color-picker.component';

@Component({
  selector: 'ng-shield-editor-settings-pattern',
  imports: [imports, ColorPickerComponent],
  template: `
    <div class="patterns">
      @for (pattern of patternSvc.available | keyvalue: originalOrder; track pattern) {
        <div
          class="pattern-thumb"
          [class.active]="pattern.key == value()?.motif.id"
          [innerHTML]="pattern.key | fn: getPatternThumbnail : value()"
          (click)="onPatternSelected(pattern.key)"
        ></div>
      }
    </div>

    @if (value(); as settings) {
      <label>
        <ng-container i18n>Color</ng-container>
        <color-picker [disabled]="settings.motif.id === 'none'" [(ngModel)]="settings.motif.color" (ngModelChange)="onChange()" />
      </label>

      <div class="flex">
        <label>
          <ng-container i18n>Posición horizontal</ng-container>
          <mat-slider discrete [disabled]="settings.motif.id === 'none'" [min]="0" [max]="100">
            <input matSliderThumb [(ngModel)]="settings.motif.x" (ngModelChange)="onChange()" />
          </mat-slider>
        </label>
        <label>
          <ng-container i18n>Posición vertical</ng-container>
          <mat-slider discrete [disabled]="settings.motif.id === 'none'" [min]="0" [max]="100">
            <input matSliderThumb [(ngModel)]="settings.motif.y" (ngModelChange)="onChange()" />
          </mat-slider>
        </label>
      </div>

      <div>
        <label>
          <ng-container i18n>Zoom</ng-container>
          <mat-slider discrete [disabled]="settings.motif.id === 'none'" [min]="0" [max]="300" [step]="10">
            <input matSliderThumb [(ngModel)]="settings.motif.zoom" (ngModelChange)="onChange()" />
          </mat-slider>
        </label>
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .patterns {
      display: flex;

      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(95px, 1fr));
      flex-wrap: wrap;
      margin: -10px; /* https://twitter.com/devongovett/status/1244679626162450432 */
      padding: 10px 0;
    }

    .pattern-thumb {
      cursor: pointer;
      margin: 10px;
      outline: none;
      border: 2px solid transparent;
      border-radius: 6px;
      background: #ebf0f6;
      padding: 5px;
      width: 75px;
      height: 75px;
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
      display: flex;
      flex-grow: 1;
      align-items: center;
    }
  `
})
export class NgShieldSettingsPatternComponent implements FormValueControl<NgShieldSettings | null> {
  // Deps
  protected readonly patternSvc = inject(NgShieldPatternService);
  private readonly _ngShieldSvc = inject(NgShieldBuilderService);
  private readonly _sanitizer = inject(DomSanitizer);

  // Estado
  public readonly value = model<NgShieldSettings | null>(null);

  protected onPatternSelected(patternID: string): void {
    if (patternID != this.value().motif.id) {
      this.value.set({ ...this.value(), motif: { ...this.value().motif, id: patternID } });
    }
  }

  protected getPatternThumbnail(motifID: string, settings: NgShieldSettings): SafeHtml | null {
    if (settings) {
      return this._sanitizer.bypassSecurityTrustHtml(this._ngShieldSvc.generateSVG({ ...settings, motif: { ...settings.motif, id: motifID } }));
    } else {
      return null;
    }
  }

  protected onChange(): void {
    this.value.set({ ...this.value() });
  }

  protected originalOrder(): number {
    return 0;
  }
}
