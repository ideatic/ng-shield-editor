import { Component, inject, model } from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import type { SafeHtml } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import type { NgShieldSettings } from '../../ng-shield-settings';
import { NgShieldBuilderService } from '../../services/ng-shield-builder.service';
import { NgShieldShapeService } from '../../services/ng-shield-shape.service';
import { imports } from '../imports';
import { ColorPickerComponent } from '../ui/color-picker.component';

@Component({
  selector: 'ng-shield-editor-settings-shape',
  imports: [imports, ColorPickerComponent],
  template: `
    <div class="shapes">
      @for (shape of shapeSvc.available | keyvalue: originalOrder; track shape) {
        <div
          class="shape-thumb"
          [class.active]="shape.key == value()?.shape.id"
          [innerHTML]="shape.key | fn: getShapeThumbnail : value()"
          (click)="onShapeSelected($any(shape.key))"
        ></div>
      }
    </div>

    @if (value(); as settings) {
      <mat-slide-toggle i18n="Indicar si se dibuja el borde de un elemento gráfico" [(ngModel)]="settings.shape.stroke" (ngModelChange)="onChange()">
        Pintar borde
      </mat-slide-toggle>

      <mat-slide-toggle i18n [(ngModel)]="settings.gloss" (ngModelChange)="onChange()">Gloss</mat-slide-toggle>

      <label>
        <ng-container i18n>Color</ng-container>
        <color-picker [(ngModel)]="settings.shape.color" (ngModelChange)="onChange()" />
      </label>
    }
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .shapes {
      display: flex;

      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(95px, 1fr));
      flex-wrap: wrap;
      margin: -10px;
      padding: 10px 0;
    }

    .shape-thumb {
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

    .shape-thumb ::ng-deep svg {
      max-width: 100%;
      max-height: 100%;
    }

    .shape-thumb.active {
      border: 2px solid #3666c8;
    }

    mat-slide-toggle {
      display: block;
      margin: 5px 0;
    }
  `
})
export class NgShieldSettingsShapeComponent implements FormValueControl<NgShieldSettings | null> {
  // Deps
  protected shapeSvc = inject(NgShieldShapeService);
  private readonly _ngShieldSvc = inject(NgShieldBuilderService);
  private readonly _sanitizer = inject(DomSanitizer);

  // Estado
  public readonly value = model<NgShieldSettings | null>(null);

  protected onShapeSelected(shapeID: string) {
    if (shapeID != this.value().shape.id) {
      this.value().shape.id = shapeID;
      this.onChange();
    }
  }

  protected getShapeThumbnail(shapeID: string, settings: NgShieldSettings): SafeHtml | null {
    if (settings) {
      return this._sanitizer.bypassSecurityTrustHtml(this._ngShieldSvc.generateSVG({ ...settings, shape: { ...settings.shape, id: shapeID } }));
    } else {
      return null;
    }
  }

  protected onChange() {
    this.value.set({ ...this.value() });
  }

  protected originalOrder() {
    return 0;
  }
}
